import request from 'supertest'
import app from '../config/app'

describe('Course Routes', () => {
  describe('POST /list', () => {
    test('Should return ok on success', async () => {
      await request(app)
        .post('/api/course/list')
        .send({
          university: 'any_university',
          kind: 'Presencial',
          level: 'Bacharelado',
          shift: 'Noite'
        })
        .expect(200)
    })
  })
})
