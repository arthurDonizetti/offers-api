import { SignUpController } from '../../presentation/controllers/signup/signup-controller'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { AccountPostgreRepository } from '../../infra/db/sequelize/account-repository/account-repository'
import { SequelizeHelper as connection } from '../../infra/db/sequelize/helpers/sequelize-helper'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { EmailValidatorAdapter } from '../../utils/email-validator/email-validator-adapter'
import { makeSignUpValidation } from './signup-validation'

export const makeSignUpController = async (): Promise<SignUpController> => {
  const emailValidator = new EmailValidatorAdapter()
  const salt = 12
  const hasher = new BcryptAdapter(salt)
  await connection.connect()
  const addAccountRepository = new AccountPostgreRepository(connection)
  const addAccount = new DbAddAccount(hasher, addAccountRepository)
  return new SignUpController(emailValidator, addAccount, makeSignUpValidation())
}
