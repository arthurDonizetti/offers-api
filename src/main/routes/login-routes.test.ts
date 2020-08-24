import request from 'supertest'
import app from '../config/app'
import { AccountRepoModel } from '../../infra/db/sequelize/models/account-model'
import { SequelizeHelper as connection } from '../../infra/db/sequelize/helpers/sequelize-helper'
import { hash } from 'bcrypt'

describe('Login Routes', () => {
  beforeAll(async () => {
    await connection.connect()
  })

  beforeEach(async () => {
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

  describe('POST /login', () => {
    test('Should return ok on login', async () => {
      const salt = 12
      const password = await hash('any_password', salt)
      const accountModel = connection.getModel('Accounts')
      await accountModel.create({
        name: 'any_name',
        email: 'any_email@mail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'any_email@mail.com',
          password: 'any_password'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 401 on login fail', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'any_email@mail.com',
          password: 'any_password'
        })
        .expect(401)
    })
  })

  describe('POST /signup', () => {
    test('Should return 200 on success', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'any_password',
          passwordConfirmation: 'any_password'
        })
        .expect(200)
    })
  })
})
