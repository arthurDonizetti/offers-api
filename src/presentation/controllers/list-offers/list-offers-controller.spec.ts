import { ListOffersController } from './list-offers-controller'
import { ListOffers, SearchOfferModel } from '../../../domain/usecases/offer/list-offers'
import { OfferModel } from '../../../domain/models/offer/offer-model'
import { HttpRequest } from '../login/login-protocols'

const makeListOffersStub = (): ListOffers => {
  class ListOffersStub implements ListOffers {
    async list (params: SearchOfferModel): Promise<OfferModel[]> {
      return await new Promise(resolve => resolve(null))
    }
  }
  return new ListOffersStub()
}

interface SutTypes {
  sut: ListOffersController
  listOffersStub: ListOffers
}

const makeSut = (): SutTypes => {
  const listOffersStub = makeListOffersStub()
  const sut = new ListOffersController(listOffersStub)
  return {
    sut,
    listOffersStub
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
      priceWithDiscount: 'ASC'
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
})
