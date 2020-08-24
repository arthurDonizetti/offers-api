import request from 'supertest'
import app from '../config/app'
import { AccountRepoModel } from '../../infra/db/sequelize/models/account-model'
import { SequelizeHelper as connection } from '../../infra/db/sequelize/helpers/sequelize-helper'

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

  describe('POST /signup', () => {
    test('Should return ok on success', async () => {
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
