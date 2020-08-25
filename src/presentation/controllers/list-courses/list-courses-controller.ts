import { Controller, HttpRequest, HttpResponse } from '../../../presentation/protocols'
import { ListCourses } from '../../../domain/usecases/course/list-courses'
import { serverError, ok } from '../../helpers/http/http-helper'

export class ListCoursesController implements Controller {
  constructor (private readonly listCourses: ListCourses) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const courses = await this.listCourses.list(httpRequest.body)
      return ok(courses)
    } catch (error) {
      return serverError(error)
    }
  }
}
