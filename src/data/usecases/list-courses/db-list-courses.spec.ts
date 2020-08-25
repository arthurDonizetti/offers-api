import { DbListCourses } from './db-list-courses'
import { SearchCourseModel } from '../../../domain/usecases/course/list-courses'
import { CourseModel } from '../../../domain/models/course/course-model'
import { ListCourseRepository } from '../../protocols/db/course/list-course-repository'

const makeListCourseRepositoryStub = (): ListCourseRepository => {
  class ListCourseRepositoryStub implements ListCourseRepository {
    async list (param: SearchCourseModel): Promise<CourseModel[]> {
      return []
    }
  }
  return new ListCourseRepositoryStub()
}

interface SutTypes {
  sut: DbListCourses
  listCourseRepositoryStub: ListCourseRepository
}

const makeSut = (): SutTypes => {
  const listCourseRepositoryStub = makeListCourseRepositoryStub()
  const sut = new DbListCourses(listCourseRepositoryStub)
  return {
    sut,
    listCourseRepositoryStub
  }
}

describe('DbListCourses UseCase', () => {
  test('Should call ListCourseRepository with correct values', async () => {
    const { sut, listCourseRepositoryStub } = makeSut()
    const listSpy = jest.spyOn(listCourseRepositoryStub, 'list')
    const httpRequest = {
      body: {
        university: 'any_university',
        kind: 'any_kind',
        level: 'any_level',
        shift: 'any_shift'
      }
    }
    await sut.list(httpRequest.body)
    expect(listSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should throw if ListCourseRepository throws', async () => {
    const { sut, listCourseRepositoryStub } = makeSut()
    jest.spyOn(listCourseRepositoryStub, 'list')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpRequest = {
      body: {
        university: 'any_university',
        kind: 'any_kind',
        level: 'any_level',
        shift: 'any_shift'
      }
    }
    const promise = sut.list(httpRequest.body)
    expect(promise).rejects.toThrow()
  })
})
