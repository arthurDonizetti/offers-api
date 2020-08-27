import { ListCoursesController } from '../../../presentation/controllers/list-courses/list-courses-controller'
import { makeListCoursesValidation } from './list-courses-validation'
import { DbListCourses } from '../../../data/usecases/list-courses/db-list-courses'
import { CoursePostgreRepository } from '../../../infra/db/sequelize/course-repository/course-repository'
import { SequelizeHelper as connection } from '../../../infra/db/sequelize/helpers/sequelize-helper'

export const makeListCoursesController = (): ListCoursesController => {
  connection.connect()
  const listCourseRepository = new CoursePostgreRepository(connection)
  const listCourses = new DbListCourses(listCourseRepository)
  return new ListCoursesController(listCourses, makeListCoursesValidation())
}
