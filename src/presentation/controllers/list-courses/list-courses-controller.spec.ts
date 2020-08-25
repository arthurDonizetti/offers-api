import {
  HttpRequest,
  Validation,
  ListCourses,
  serverError,
  badRequest,
  ok
} from './list-courses-protocols'

import { ListCoursesController } from './list-courses-controller'
import { CourseModel } from '../../../domain/models/course/course-model'
import { InvalidParamError } from '../../errors'

const makeListCoursesStub = (): ListCourses => {
  class ListCoursesStub implements ListCourses {
    async list (params: any): Promise<CourseModel[]> {
      return []
    }
  }
  return new ListCoursesStub()
}

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: ListCoursesController
  listCoursesStub: ListCourses
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const listCoursesStub = makeListCoursesStub()
  const sut = new ListCoursesController(listCoursesStub, validationStub)
  return {
    sut,
    listCoursesStub,
    validationStub
  }
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    university: 'any_name',
    kind: 'any_kind',
    level: 'any_level',
    shift: 'any_shift'
  }
})

describe('ListCourses Controller', () => {
  test('Should call ListCourses with correct values', async () => {
    const { sut, listCoursesStub } = makeSut()
    const listSpy = jest.spyOn(listCoursesStub, 'list')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(listSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return ServerError if ListCourses throws', async () => {
    const { sut, listCoursesStub } = makeSut()
    jest.spyOn(listCoursesStub, 'list')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return ok if valid values are provided', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok([]))
  })

  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return bad request if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new InvalidParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('any_field')))
  })
})
