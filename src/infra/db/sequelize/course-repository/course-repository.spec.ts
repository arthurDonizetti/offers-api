import { CoursePostgreRepository } from './course-repository'
import { SequelizeHelper as connection } from '../helpers/sequelize-helper'
import { ModelCtor, Model } from 'sequelize/types'
import { CourseRepoModel } from '../models/course-model'
import { UniversityRepoModel } from '../models/university-model'
import { CampusRepoModel } from '../models/campus-model'

const initializeModels = (connection: any): void => {
  UniversityRepoModel(connection.client)
  CampusRepoModel(connection.client)
  CourseRepoModel(connection.client)
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
    await saveFakeCourse(courseModel, fakeCampus.getDataValue('id'))
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

const makeSut = (): CoursePostgreRepository => {
  return new CoursePostgreRepository(connection)
}

describe('Course Postgre Repository', () => {
  beforeAll(async () => {
    await connection.connect()
    initializeModels(connection)
    await makeTestData(connection)
  })

  afterAll(async () => {
    await destroyTestData(connection)
    await connection.disconnect()
  })

  test('Should return a list of courses on success', async () => {
    const sut = makeSut()
    const list = await sut.list({
      university: 'any_university',
      kind: '',
      level: '',
      shift: ''
    })
    expect(list).toEqual(
      [
        {
          course: {
            name: 'any_course',
            kind: 'Presencial',
            level: 'Bacharelado',
            shift: 'Noite',
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
        }
      ]
    )
  })

  test('Should return an empty array if no result is found', async () => {
    const sut = makeSut()
    const list = await sut.list({
      university: 'other_university',
      kind: '',
      level: '',
      shift: ''
    })
    expect(list).toEqual([])
  })

  test('Should return the correct amount of items found', async () => {
    const sut = makeSut()
    await makeTestData(connection)
    await makeTestData(connection)
    const list = await sut.list({
      university: 'any_university',
      kind: 'Presencial',
      level: '',
      shift: ''
    })
    expect(list.length).toBe(3)
  })
})
