import { SequelizeHelper as connection } from '../helpers/sequelize-helper'
import { OfferPostgreRepository } from './offer-repository'
import { ModelCtor, Model } from 'sequelize/types'
import { UniversityRepoModel } from '../models/university-model'
import { CampusRepoModel } from '../models/campus-model'
import { CourseRepoModel } from '../models/course-model'
import { OfferRepoModel } from '../models/offer-model'

const initializeModels = (connection: any): void => {
  UniversityRepoModel(connection.client)
  CampusRepoModel(connection.client)
  CourseRepoModel(connection.client)
  OfferRepoModel(connection.client)
}

const makeFakeOffer = (idCourse: number): any => ({
  course_id: idCourse,
  full_price: 0,
  price_with_discount: 0,
  discount_percentage: 0,
  start_date: '10/01/2020',
  enrollment_semester: '2020.1',
  enabled: true
})

const saveFakeOffer = async (model: ModelCtor<Model<any, any>>, idCourse: number): Promise<Model<any, any>> => {
  return await model.create(makeFakeOffer(idCourse))
}

const makeFakeCourse = (idCampus: number): any => ({
  campus_id: idCampus,
  name: 'any_course',
  kind: 'Presencial',
  level: 'Bacharelado',
  shift: 'Noite'
})

const saveFakeCourse = async (model: ModelCtor<Model<any, any>>, idCampus: number): Promise<Model<any, any>> => {
  return await model.create(makeFakeCourse(idCampus))
}

const makeFakeCampus = (idUniversity: number): any => ({
  university_id: idUniversity,
  name: 'any_campus',
  city: 'any_city'
})

const saveFakeCampus = async (model: ModelCtor<Model<any, any>>, idUniversity: number): Promise<Model<any, any>> => {
  return await model.create(makeFakeCampus(idUniversity))
}

const makeFakeUniversity = (): any => ({
  name: 'any_university',
  score: 5.1,
  logo_url: 'any_logo.jpg'
})

const saveFakeUniversity = async (model: ModelCtor<Model<any, any>>): Promise<Model<any, any>> => {
  return await model.create(makeFakeUniversity())
}

const makeTestData = async (connection: any): Promise<void> => {
  try {
    const universityModel = connection.getModel('Universities')
    const fakeUniversity = await saveFakeUniversity(universityModel)

    const campusModel = connection.getModel('Campus')
    const fakeCampus = await saveFakeCampus(campusModel, fakeUniversity.getDataValue('id'))

    const courseModel = connection.getModel('Courses')
    const fakeCourse = await saveFakeCourse(courseModel, fakeCampus.getDataValue('id'))

    const offerModel = connection.getModel('Offers')
    await saveFakeOffer(offerModel, fakeCourse.getDataValue('id'))
  } catch (error) {
    console.log(error)
  }
}

const destroyTestData = async (connection: any): Promise<void> => {
  try {
    const courseModel = connection.getModel('Courses')
    await courseModel.destroy({ where: {} })

    const campusModel = connection.getModel('Campus')
    await campusModel.destroy({ where: {} })

    const universityModel = connection.getModel('Universities')
    await universityModel.destroy({ where: {} })
  } catch (error) {
    console.log(error)
  }
}

const makeSut = (): OfferPostgreRepository => {
  return new OfferPostgreRepository(connection)
}

const makeFakeResult = (): any => ([
  {
    full_price: 0,
    price_with_discount: 0,
    discount_percentage: 0,
    start_date: '10/01/2020',
    enrollment_semester: '2020.1',
    enabled: true,
    course: {
      name: 'any_course',
      kind: 'Presencial',
      level: 'Bacharelado',
      shift: 'Noite'
    },
    university: {
      name: 'any_university',
      score: 5.1,
      logo_url: 'any_logo.jpg'
    },
    campus: {
      name: 'any_campus',
      city: 'any_city'
    }
  }
])

describe('Offer Postgre Repository', () => {
  beforeAll(async () => {
    await connection.connect()
    initializeModels(connection)
  })

  beforeEach(async () => {
    await makeTestData(connection)
  })

  afterEach(async () => {
    await destroyTestData(connection)
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  test('Should return a list of offers on success', async () => {
    const sut = makeSut()
    const list = await sut.list({
      city: '',
      course: '',
      kind: '',
      level: '',
      shift: '',
      university: '',
      order: {
        price_with_discount: {
          direction: ''
        }
      }
    })
    expect(list).toEqual(makeFakeResult())
  })

  test('Should return the correct amount of items found', async () => {
    const sut = makeSut()
    await makeTestData(connection)
    await makeTestData(connection)
    const list = await sut.list({
      city: '',
      course: '',
      kind: '',
      level: '',
      shift: '',
      university: '',
      order: {
        price_with_discount: {
          direction: ''
        }
      }
    })
    expect(list.length).toBe(3)
  })
})
