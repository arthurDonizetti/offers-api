import request from 'supertest'
import app from '../config/app'
import { SequelizeHelper as connection } from '../../infra/db/sequelize/helpers/sequelize-helper'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await connection.connect(process.env.DATABASE_URL)
  })

  beforeEach(async () => {
    const accountModel = (await import('../../infra/db/sequelize/models/account-model')).default
    await accountModel.destroy({ where: {}, truncate: true })
  })

  afterAll(async () => {
    const accountModel = (await import('../../infra/db/sequelize/models/account-model')).default
    await accountModel.destroy({ where: {}, truncate: true })
    await connection.disconnect()
  })

  test('Should return an account on success', async () => {
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
