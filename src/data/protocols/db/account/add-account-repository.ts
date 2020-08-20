import { AddAccountModel } from '../../../../domain/usecases/account/add-account'
import { AccountModel } from '../../../../domain/models/account/account-model'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}