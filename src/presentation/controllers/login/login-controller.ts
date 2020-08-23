import { Controller, HttpRequest, HttpResponse, Authentication } from './login-protocols'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body
    await this.authentication.auth({ email, password })
    return await new Promise(resolve => resolve(null))
  }
}
