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

    test('Should return success if missing param is provided', async () => {
      await request(app)
        .post('/api/course/list')
        .send({
          university: 'any_university',
          level: 'Bacharelado',
          shift: 'Noite'
        })
        .expect(200)
      await request(app)
        .post('/api/course/list')
        .send({
          level: 'Bacharelado',
          shift: 'Noite'
        })
        .expect(200)
      await request(app)
        .post('/api/course/list')
        .send({
          shift: 'Noite'
        })
        .expect(200)
      await request(app)
        .post('/api/course/list')
        .send({})
        .expect(200)
    })
  })
})
