import {
  AddAccount,
  AddAccountModel,
  AccountModel,
  Hasher
} from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher
  ) {}

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this.hasher.hash(account.password)
    return await new Promise(resolve => resolve(null))
  }
}
