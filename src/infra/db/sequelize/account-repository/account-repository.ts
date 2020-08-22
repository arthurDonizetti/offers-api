import { AddAccountRepository } from '../../../../data/protocols/db/account/add-account-repository'
import { AddAccountModel } from '../../../../domain/usecases/account/add-account'
import { AccountModel } from '../../../../domain/models/account/account-model'

export class AccountPostgreRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountModel = (await import('../models/account-model')).default
    const account = await accountModel.create(accountData)
    return await new Promise(resolve => resolve(account))
  }
}
