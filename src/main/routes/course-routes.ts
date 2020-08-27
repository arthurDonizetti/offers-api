import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeListCoursesController } from '../factories/list-courses/list-courses-factory'

export default async (router: Router): Promise<void> => {
  router.post('/course/list', adaptRoute(await makeListCoursesController()))
}
