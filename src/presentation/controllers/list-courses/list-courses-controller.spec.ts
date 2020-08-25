import { ListCoursesController } from './list-courses-controller'
import { ListCourses } from '../../../domain/usecases/course/list-courses'
import { CourseModel } from '../../../domain/models/course/course-model'

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
})
