import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { ListOffers } from '../../../domain/usecases/offer/list-offers'
import { serverError } from '../signup/signup-protocols'

export class ListOffersController implements Controller {
  constructor (
    private readonly listOffers: ListOffers
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.listOffers.list(httpRequest.body)
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
