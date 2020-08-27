
import { makeLoginValidation } from './login-validation'
import { LoginController } from '../../../presentation/controllers/login/login-controller'
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication'
import { AccountPostgreRepository } from '../../../infra/db/sequelize/account-repository/account-repository'
import { SequelizeHelper as connection } from '../../../infra/db/sequelize/helpers/sequelize-helper'
import { BcryptAdapter } from '../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter/jwt-adapter'

export const makeLoginController = async (): Promise<LoginController> => {
  const secret = process.env.JWT_SECRET
  const encrypter = new JwtAdapter(secret)
  const salt = 12
  const hashComparer = new BcryptAdapter(salt)
  await connection.connect()
  const accountRepository = new AccountPostgreRepository(connection)
  const authentication = new DbAuthentication(
    accountRepository,
    hashComparer,
    encrypter,
    accountRepository)
  return new LoginController(authentication, makeLoginValidation())
}
