import { OfferModel } from '../../models/offer/offer-model'

export interface SearchOfferModel {
  university: string
  course: string
  city: string
  kind: string
  level: string
  shift: string
  order: {
    priceWithDiscount: string
  }
}

export interface ListOffers {
  list: (params: SearchOfferModel) => Promise<OfferModel[]>
}
