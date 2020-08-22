import { SequelizeHelper as connection } from '../helpers/sequelize-helper'
import { AccountPostgreRepository } from './account-repository'

const makeSut = (): AccountPostgreRepository => {
  return new AccountPostgreRepository()
}

describe('Account Postgre Repository', () => {
  beforeAll(async () => {
    await connection.connect(process.env.DATABASE_URL)
  })

  afterAll(async () => {
    const accountModel = (await import('../models/account-model')).default
    await accountModel.destroy({ where: {}, truncate: true })
    await connection.disconnect()
  })

  test('Should return an account on success', async () => {
    const sut = makeSut()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })
})
