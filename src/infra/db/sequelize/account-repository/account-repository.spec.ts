import { SequelizeHelper as connection } from '../helpers/sequelize-helper'
import { AccountPostgreRepository } from './account-repository'
import { AccountRepoModel } from '../models/account-model'

const makeSut = (): AccountPostgreRepository => {
  return new AccountPostgreRepository(connection)
}

describe('Account Postgre Repository', () => {
  beforeEach(async () => {
    await connection.connect()
    AccountRepoModel(connection.client)
    const accountModel = connection.getModel('Accounts')
    await accountModel.destroy({ where: {}, truncate: true })
  })

  afterAll(async () => {
    AccountRepoModel(connection.client)
    const accountModel = connection.getModel('Accounts')
    await accountModel.destroy({ where: {}, truncate: true })
    await connection.disconnect()
  })

  test('Should return an account on add success', async () => {
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

  test('Should  return an account on loadByEmail success', async () => {
    const sut = makeSut()
    const accountModel = connection.getModel('Accounts')
    await accountModel.create({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })

  test('Should return null if loadByEmail returns null', async () => {
    const sut = makeSut()
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeFalsy()
  })

  test('Should update the account accessToken on updateAccessToken success', async () => {
    const sut = makeSut()
    const accountModel = connection.getModel('Accounts')
    const newAccount = await accountModel.create({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    const fakeId = newAccount.getDataValue('id')
    const fakeToken = newAccount.getDataValue('access_token')
    expect(fakeToken).toBeFalsy()
    await sut.updateAccessToken(fakeId, 'any_token')
    const account = await accountModel.findOne({ where: { id: fakeId } })
    const id = account.getDataValue('id')
    const accessToken = account.getDataValue('access_token')
    expect(id).toBeTruthy()
    expect(accessToken).toBe('any_token')
  })
})
