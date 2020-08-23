import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeSignUpController } from '../factories/signup-factory'

export default async (router: Router): Promise<void> => {
  router.post('/signup', adaptRoute(await makeSignUpController()))
}
