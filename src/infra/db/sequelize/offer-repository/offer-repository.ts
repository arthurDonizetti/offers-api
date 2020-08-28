import { ListOfferRepository } from '../../../../data/protocols/db/offer/list-offer-repository'
import { SearchOfferModel } from '../../../../domain/usecases/offer/list-offers'
import { OfferModel } from '../../../../domain/models/offer/offer-model'
import { ModelCtor, Model } from 'sequelize/types'
import { UniversityRepoModel } from '../models/university-model'
import { CampusRepoModel } from '../models/campus-model'
import { CourseRepoModel } from '../models/course-model'
import { OfferRepoModel } from '../models/offer-model'
import { Op } from 'sequelize'

export class OfferPostgreRepository implements ListOfferRepository {
  private offerModel: ModelCtor<Model<any, any>>
  private courseModel: ModelCtor<Model<any, any>>
  private campusModel: ModelCtor<Model<any, any>>
  private universityModel: ModelCtor<Model<any, any>>

  constructor (
    private readonly connection: any
  ) {}

  async list (param: SearchOfferModel): Promise<OfferModel[]> {
    await this.initializeModels(this.connection)

    const clause = this.makeWhereClause(param)
    const order = []
    if (param.order.price_with_discount.direction !== '') {
      order.push(['price_with_discount', param.order.price_with_discount.direction])
    }

    const searchResult = await this.offerModel.findAll(
      {
        attributes: ['full_price',
          'price_with_discount',
          'discount_percentage',
          'start_date',
          'enrollment_semester',
          'enabled'],
        include: [{
          model: this.courseModel,
          required: true,
          attributes: ['name', 'kind', 'level', 'shift'],
          include: [{
            model: this.campusModel,
            required: true,
            attributes: ['name', 'city'],
            include: [{
              model: this.universityModel,
              required: true,
              attributes: ['name', 'score', 'logo_url']
            }]
          }]
        }],
        where: clause,
        order: order
      }
    )
    const formattedData: OfferModel[] = []
    this.formatResultToSend(formattedData, searchResult)
    return formattedData
  }

  private makeWhereClause (param: SearchOfferModel): any {
    const { city, university, course, shift, level, kind } = param
    const whereClause = {}

    if (city !== '') {
      whereClause['$"Course->Campus"."city"$'] = {
        [Op.iLike]: `%${city}%`
      }
    }

    if (university !== '') {
      whereClause['$"Course->Campus->University"."name"$'] = {
        [Op.iLike]: `%${university}%`
      }
    }

    if (course !== '') {
      whereClause['$"Course"."name"$'] = {
        [Op.iLike]: `${course}`
      }
    }

    if (shift !== '') {
      whereClause['$"Course"."shift"$'] = {
        [Op.iLike]: `${shift}`
      }
    }

    if (level !== '') {
      whereClause['$"Course"."level"$'] = {
        [Op.iLike]: `${level}`
      }
    }

    if (kind !== '') {
      whereClause['$"Course"."kind"$'] = {
        [Op.iLike]: `${kind}`
      }
    }

    return whereClause
  }

  private readonly initializeModels = async (connection: any): Promise<void> => {
    const associateUniversity = await UniversityRepoModel(connection.client)
    const associateCampus = await CampusRepoModel(connection.client)
    const associateCourse = await CourseRepoModel(connection.client)
    const associateOffer = await OfferRepoModel(connection.client)
    this.offerModel = connection.getModel('Offers')
    this.courseModel = connection.getModel('Courses')
    this.campusModel = connection.getModel('Campus')
    this.universityModel = connection.getModel('Universities')
    associateOffer(this.courseModel)
    associateCourse(this.campusModel, this.offerModel)
    associateCampus(this.courseModel, this.universityModel)
    associateUniversity(this.campusModel)
  }

  private readonly formatResultToSend = (formatted: OfferModel[], data: Array<Model<any, any>>): void => {
    for (const item of data) {
      const structure: OfferModel = {
        full_price: parseFloat(item.getDataValue('full_price')),
        price_with_discount: parseFloat(item.getDataValue('price_with_discount')),
        discount_percentage: parseFloat(item.getDataValue('discount_percentage')),
        start_date: item.getDataValue('start_date'),
        enrollment_semester: item.getDataValue('enrollment_semester'),
        enabled: item.getDataValue('enabled'),
        course: {
          name: item.getDataValue('Course').name,
          kind: item.getDataValue('Course').kind,
          level: item.getDataValue('Course').level,
          shift: item.getDataValue('Course').shift
        },
        university: {
          name: item.getDataValue('Course').Campus.University.getDataValue('name'),
          score: parseFloat(item.getDataValue('Course').Campus.University.getDataValue('score')),
          logo_url: item.getDataValue('Course').Campus.University.getDataValue('logo_url')
        },
        campus: {
          name: item.getDataValue('Course').Campus.getDataValue('name'),
          city: item.getDataValue('Course').Campus.getDataValue('city')
        }
      }
      formatted.push(structure)
    }
  }
}
