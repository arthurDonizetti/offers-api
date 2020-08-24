import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication/authentication'
import { LoadAccountByEmailRepository } from '../../protocols/db/account/load-account-by-email-repository'
import { HashComparer } from '../../../data/protocols/cryptography/hash-comparer'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      await this.hashComparer.compare(authentication.password, account.password)
    }
    return await new Promise(resolve => resolve(null))
  }
}
