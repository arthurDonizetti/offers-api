import { ListOffers, SearchOfferModel } from '../../../domain/usecases/offer/list-offers'
import { OfferModel } from '../../../domain/models/offer/offer-model'
import { ListOfferRepository } from '../../protocols/db/offer/list-offer-repository'

export class DbListOffers implements ListOffers {
  constructor (
    private readonly listOfferRepository: ListOfferRepository
  ) {}

  async list (params: SearchOfferModel): Promise<OfferModel[]> {
    await this.listOfferRepository.list(params)
    return await new Promise(resolve => resolve(null))
  }
}
