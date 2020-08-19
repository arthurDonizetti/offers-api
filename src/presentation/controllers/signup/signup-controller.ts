import { HttpRequest, HttpResponse } from '../../../presentation/protocols/http'
import { MissingParamError, InvalidParamError } from '../../../presentation/errors'
import { badRequest, serverError } from '../../../presentation/helpers/http-helper'
import { Controller } from '../../../presentation/protocols/controller'
import { EmailValidator } from '../../../presentation/protocols/email-validator'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator
  ) {}

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (httpRequest.body[field] === undefined) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValidEmail = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
