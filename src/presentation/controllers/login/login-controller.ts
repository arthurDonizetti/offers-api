import { Controller, HttpRequest, HttpResponse, Authentication } from './login-protocols'
import { unauthorized } from '../signup/signup-protocols'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body
    const accessToken = await this.authentication.auth({ email, password })
    if (!accessToken) {
      return unauthorized()
    }
    return await new Promise(resolve => resolve(null))
  }
}
