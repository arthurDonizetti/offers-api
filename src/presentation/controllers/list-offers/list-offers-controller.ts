import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { ListOffers } from '../../../domain/usecases/offer/list-offers'

export class ListOffersController implements Controller {
  constructor (
    private readonly listOffers: ListOffers
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.listOffers.list(httpRequest.body)
    return null
  }
}
