import { HttpRequest, HttpResponse } from '../../../presentation/protocols/http'
import { MissingParamError } from '../../../presentation/errors/missing-param-error'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const { name, email, password, passwordConfirmation } = httpRequest.body

    if (name === undefined) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    }

    if (email === undefined) {
      return {
        statusCode: 400,
        body: new MissingParamError('email')
      }
    }

    if (password === undefined) {
      return {
        statusCode: 400,
        body: new MissingParamError('password')
      }
    }

    if (passwordConfirmation === undefined) {
      return {
        statusCode: 400,
        body: new MissingParamError('passwordConfirmation')
      }
    }
  }
}
