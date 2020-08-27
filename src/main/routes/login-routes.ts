import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeSignUpController } from '../factories/signup/signup-factory'
import { makeLoginController } from '../factories/login/login-factory'

export default async (router: Router): Promise<void> => {
  router.post('/login', adaptRoute(await makeLoginController()))
    .post('/signup', adaptRoute(await makeSignUpController()))
}
