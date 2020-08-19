import { HttpRequest, HttpResponse } from '../../../presentation/protocols/http'
import { MissingParamError } from '../../../presentation/errors/missing-param-error'
import { badRequest } from '../../../presentation/helpers/http-helper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const { name, email, password, passwordConfirmation } = httpRequest.body

    if (name === undefined) {
      return badRequest(new MissingParamError('name'))
    }

    if (email === undefined) {
      return badRequest(new MissingParamError('email'))
    }

    if (password === undefined) {
      return badRequest(new MissingParamError('password'))
    }

    if (passwordConfirmation === undefined) {
      return badRequest(new MissingParamError('passwordConfirmation'))
    }
  }
}
