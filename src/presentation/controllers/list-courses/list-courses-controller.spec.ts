import { ListCoursesController } from './list-courses-controller'
import { ListCourses } from '../../../domain/usecases/course/list-courses'
import { CourseModel } from '../../../domain/models/course/course-model'
import { serverError } from '../../helpers/http/http-helper'

interface SutTypes {
  sut: ListCoursesController
  listCoursesStub: ListCourses
}

const makeListCoursesStub = (): ListCourses => {
  class ListCoursesStub implements ListCourses {
    async list (params: any): Promise<CourseModel[]> {
      return []
    }
  }
  return new ListCoursesStub()
}

const makeSut = (): SutTypes => {
  const listCoursesStub = makeListCoursesStub()
  const sut = new ListCoursesController(listCoursesStub)
  return {
    sut,
    listCoursesStub
  }
}

describe('ListCourses Controller', () => {
  test('Should call ListCourses with correct values', async () => {
    const { sut, listCoursesStub } = makeSut()
    const listSpy = jest.spyOn(listCoursesStub, 'list')
    const httpRequest = {
      body: {
        university: 'any_name',
        kind: 'any_kind',
        level: 'any_level',
        shift: 'any_shift'
      }
    }
    await sut.handle(httpRequest)
    expect(listSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return ServerError if ListCourses throws', async () => {
    const { sut, listCoursesStub } = makeSut()
    jest.spyOn(listCoursesStub, 'list')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpRequest = {
      body: {
        university: 'any_name',
        kind: 'any_kind',
        level: 'any_level',
        shift: 'any_shift'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
