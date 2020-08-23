import { SignUpController } from '../../presentation/controllers/signup/signup-controller'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { AccountPostgreRepository } from '../../infra/db/sequelize/account-repository/account-repository'
import { EmailValidatorAdapter } from '../../utils/email-validator/email-validator-adapter'

export const makeSignUpController = (): SignUpController => {
  const emailValidator = new EmailValidatorAdapter()
  const salt = 12
  const hasher = new BcryptAdapter(salt)
  const addAccountRepository = new AccountPostgreRepository()
  const addAccount = new DbAddAccount(hasher, addAccountRepository)
  return new SignUpController(emailValidator, addAccount)
}
