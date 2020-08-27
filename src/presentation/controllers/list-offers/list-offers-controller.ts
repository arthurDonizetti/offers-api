import { Controller, HttpRequest, HttpResponse, Validation } from '../../protocols'
import { ListOffers } from '../../../domain/usecases/offer/list-offers'
import { serverError, ok, badRequest } from '../../helpers/http/http-helper'

export class ListOffersController implements Controller {
  constructor (
    private readonly listOffers: ListOffers,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const offers = await this.listOffers.list(httpRequest.body)
      return ok(offers)
    } catch (error) {
      return serverError(error)
    }
  }
}
