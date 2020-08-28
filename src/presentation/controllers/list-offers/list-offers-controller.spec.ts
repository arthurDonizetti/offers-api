import { ListOffersController } from './list-offers-controller'
import { ListOffers, SearchOfferModel } from '../../../domain/usecases/offer/list-offers'
import { OfferModel } from '../../../domain/models/offer/offer-model'
import { HttpRequest, Validation } from '../../protocols'
import { serverError, ok, badRequest } from '../../helpers/http/http-helper'
import { InvalidParamError } from '../../errors'

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeListOffersStub = (): ListOffers => {
  class ListOffersStub implements ListOffers {
    async list (params: SearchOfferModel): Promise<OfferModel[]> {
      return await new Promise(resolve => resolve([]))
    }
  }
  return new ListOffersStub()
}

interface SutTypes {
  sut: ListOffersController
  listOffersStub: ListOffers
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const listOffersStub = makeListOffersStub()
  const sut = new ListOffersController(listOffersStub, validationStub)
  return {
    sut,
    listOffersStub,
    validationStub
  }
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    university: 'any_university',
    course: 'any_course',
    city: 'any_city',
    kind: 'any_kind',
    level: 'any_level',
    shift: 'any_shift',
    order: {
      price_with_discount: {
        direction: 'ASC'
      }
    }
  }
})

describe('ListOffers Controller', () => {
  test('Should call ListOffers with correct values', async () => {
    const { sut, listOffersStub } = makeSut()
    const listSpy = jest.spyOn(listOffersStub, 'list')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(listSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return ServerError if ListOffer throws', async () => {
    const { sut, listOffersStub } = makeSut()
    jest.spyOn(listOffersStub, 'list')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return ok if valid values are provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
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
