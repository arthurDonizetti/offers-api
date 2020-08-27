import { SearchOfferModel } from '../../../../domain/usecases/offer/list-offers'
import { OfferModel } from '../../../../domain/models/offer/offer-model'

export interface ListOfferRepository {
  list: (param: SearchOfferModel) => Promise<OfferModel[]>
}
