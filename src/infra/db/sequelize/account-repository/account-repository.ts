import { AddAccountRepository } from '../../../../data/protocols/db/account/add-account-repository'
import { AddAccountModel } from '../../../../domain/usecases/account/add-account'
import { AccountModel } from '../../../../domain/models/account/account-model'
import { AccountRepoModel } from '../models/account-model'
import { ModelCtor, Model } from 'sequelize/types'

export class AccountPostgreRepository implements AddAccountRepository {
  private readonly model: ModelCtor<Model<any, any>>

  constructor (connection: any) {
    AccountRepoModel(connection.client)
    this.model = connection.getModel('Accounts')
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const account = await this.model.create(accountData)
    return {
      id: account.getDataValue('id'),
      name: account.getDataValue('name'),
      email: account.getDataValue('email'),
      password: account.getDataValue('password')
    }
  }
}
