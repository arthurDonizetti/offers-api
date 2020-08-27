import { DbListOffers } from './db-list-offers'
import { SearchOfferModel } from '../../../domain/usecases/offer/list-offers'
import { OfferModel } from '../../../domain/models/offer/offer-model'
import { ListOfferRepository } from '../../protocols/db/offer/list-offer-repository'

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

describe('DbListOffers UseCase', () => {
  test('Should call ListOfferRepository with correct values', async () => {
    const { sut, listOfferRepositoryStub } = makeSut()
    const listSpy = jest.spyOn(listOfferRepositoryStub, 'list')
    const httpRequest = {
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
    }
    await sut.list(httpRequest.body)
    expect(listSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
