import { SequelizeHelper as sut } from './sequelize-helper'

describe('Sequelize Helper', () => {
  beforeAll(async () => {
    await sut.connect()
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should return true if connection is open', async () => {
    const isConnected = sut.testConnection()
    expect(isConnected).toBeTruthy()
  })
})
