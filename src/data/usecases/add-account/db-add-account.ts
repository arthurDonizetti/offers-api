import { AddAccount, AddAccountModel } from '../../../domain/usecases/account/add-account'
import { AccountModel } from '../../../domain/models/account/account-model'
import { Hasher } from '../../../data/protocols/hasher'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher
  ) {}

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this.hasher.hash(account.password)
    return await new Promise(resolve => resolve(null))
  }
}
