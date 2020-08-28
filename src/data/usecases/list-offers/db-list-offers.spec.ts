import { DbListOffers } from './db-list-offers'
import { SearchOfferModel } from '../../../domain/usecases/offer/list-offers'
import { OfferModel } from '../../../domain/models/offer/offer-model'
import { ListOfferRepository } from '../../protocols/db/offer/list-offer-repository'
import { HttpRequest } from '../../../presentation/protocols'

const makeListOfferRepositoryStub = (): ListOfferRepository => {
  class ListOfferRepositoryStub implements ListOfferRepository {
    async list (param: SearchOfferModel): Promise<OfferModel[]> {
      return await new Promise(resolve => resolve([]))
    }
  }
  return new ListOfferRepositoryStub()
}

interface SutTypes {
  sut: DbListOffers
  listOfferRepositoryStub: ListOfferRepository
}

const makeSut = (): SutTypes => {
  const listOfferRepositoryStub = makeListOfferRepositoryStub()
  const sut = new DbListOffers(listOfferRepositoryStub)
  return {
    sut,
    listOfferRepositoryStub
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
    price_with_discount_order_direction: 'ASC'
  }
})

describe('DbListOffers UseCase', () => {
  test('Should call ListOfferRepository with correct values', async () => {
    const { sut, listOfferRepositoryStub } = makeSut()
    const listSpy = jest.spyOn(listOfferRepositoryStub, 'list')
    const httpRequest = makeFakeRequest()
    await sut.list(httpRequest.body)
    expect(listSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should throw if ListOfferRepository throws', async () => {
    const { sut, listOfferRepositoryStub } = makeSut()
    jest.spyOn(listOfferRepositoryStub, 'list')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = sut.list(makeFakeRequest().body)
    await expect(httpResponse).rejects.toThrow()
  })

  test('Should return a list of offers on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.list(makeFakeRequest().body)
    await expect(httpResponse).toEqual([])
  })
})
