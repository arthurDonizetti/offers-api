import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication/authentication'
import { LoadAccountByEmailRepository } from '../../protocols/db/account/load-account-by-email-repository'
import { HashComparer } from '../../../data/protocols/cryptography/hash-comparer'
import { TokenGenerator } from '../../../data/protocols/cryptography/token-generator'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password)
      if (isValid) {
        const accessToken = await this.tokenGenerator.generate(account.id)
        return accessToken
      }
    }
    return await new Promise(resolve => resolve(null))
  }
}
