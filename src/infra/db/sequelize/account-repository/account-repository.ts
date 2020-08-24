import { AddAccountRepository } from '../../../../data/protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/account/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '../../../../data/protocols/db/account/update-access-token-repository'
import { AddAccountModel } from '../../../../domain/usecases/account/add-account'
import { AccountModel } from '../../../../domain/models/account/account-model'
import { AccountRepoModel } from '../models/account-model'
import { ModelCtor, Model } from 'sequelize/types'

export class AccountPostgreRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository {
  private readonly model: ModelCtor<Model<any, any>>

  constructor (private readonly connection: any) {
    AccountRepoModel(connection.client)
    this.model = connection.getModel('Accounts')
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const account = await this.model.create(accountData)
    this.connection.disconnect()
    return {
      id: account.getDataValue('id'),
      name: account.getDataValue('name'),
      email: account.getDataValue('email'),
      password: account.getDataValue('password')
    }
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const account = await this.model.findOne({ where: { email: email } })
    this.connection.disconnect()
    if (account) {
      return {
        id: account.getDataValue('id'),
        name: account.getDataValue('name'),
        email: account.getDataValue('email'),
        password: account.getDataValue('password')
      }
    } else {
      return null
    }
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    await this.model.update({
      access_token: token
    },
    {
      where: { id: id }
    })
  }
}
