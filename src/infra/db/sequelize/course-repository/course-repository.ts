import { ListCourseRepository } from '../../../../data/protocols/db/course/list-course-repository'
import { SearchCourseModel } from '../../../../domain/usecases/course/list-courses'
import { ResultFormat } from '../../../../domain/models/course/course-model'
import { CourseRepoModel } from '../models/course-model'
import { UniversityRepoModel } from '../models/university-model'
import { CampusRepoModel } from '../models/campus-model'
import { ModelCtor, Model } from 'sequelize/types'
import { Op } from 'sequelize'

export class CoursePostgreRepository implements ListCourseRepository {
  private courseModel: ModelCtor<Model<any, any>>
  private campusModel: ModelCtor<Model<any, any>>
  private universityModel: ModelCtor<Model<any, any>>

  constructor (private readonly connection: any) {}

  async list (param: SearchCourseModel): Promise<ResultFormat[]> {
    await this.initializeModels(this.connection)
    const { university, kind, level, shift } = param
    const searchResult = await this.courseModel.findAll(
      {
        attributes: ['name', 'kind', 'level', 'shift'],
        include: [{
          model: this.campusModel,
          required: true,
          attributes: ['name', 'city'],
          include: [{
            model: this.universityModel,
            required: true,
            attributes: ['name', 'score', 'logo_url'],
            where: {
              [Op.or]: [
                {
                  name: {
                    [Op.eq]: university
                  }
                },
                {
                  name: {
                    [Op.not]: null
                  }
                }
              ]
            }
          }]
        }],
        where: {
          [Op.or]: [
            {
              [Op.or]: [
                {
                  kind: {
                    [Op.eq]: kind
                  }
                },
                {
                  kind: {
                    [Op.not]: null
                  }
                }
              ]
            },
            {
              [Op.or]: [
                {
                  level: {
                    [Op.eq]: level
                  }
                },
                {
                  level: {
                    [Op.not]: null
                  }
                }
              ]
            },
            {
              [Op.or]: [
                {
                  shift: {
                    [Op.eq]: shift
                  }
                },
                {
                  shift: {
                    [Op.not]: null
                  }
                }
              ]
            }
          ]
        }
      }
    )
    const formattedData: ResultFormat[] = []
    this.formatResultToSend(formattedData, searchResult)
    return formattedData
  }

  private readonly initializeModels = async (connection: any): Promise<void> => {
    const associateUniversity = await UniversityRepoModel(connection.client)
    const associateCampus = await CampusRepoModel(connection.client)
    const associateCourse = await CourseRepoModel(connection.client)
    this.courseModel = connection.getModel('Courses')
    this.campusModel = connection.getModel('Campus')
    this.universityModel = connection.getModel('Universities')
    associateCourse(this.campusModel)
    associateCampus(this.courseModel, this.universityModel)
    associateUniversity(this.campusModel)
  }

  private readonly formatResultToSend = (formatted: ResultFormat[], data: Array<Model<any, any>>): void => {
    for (const item of data) {
      const structure: ResultFormat = { course: { name: '', shift: '', level: '', kind: '' } }
      structure.course = {
        name: item.getDataValue('name'),
        kind: item.getDataValue('kind'),
        level: item.getDataValue('level'),
        shift: item.getDataValue('shift'),
        university: {
          name: item.getDataValue('Campus').University.getDataValue('name'),
          score: parseFloat(item.getDataValue('Campus').University.getDataValue('score')),
          logo_url: item.getDataValue('Campus').University.getDataValue('logo_url')
        },
        campus: {
          name: item.getDataValue('Campus').getDataValue('name'),
          city: item.getDataValue('Campus').getDataValue('city')
        }
      }
      formatted.push(structure)
    }
  }
}
