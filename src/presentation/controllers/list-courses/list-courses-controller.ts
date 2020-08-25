import { Controller, HttpRequest, HttpResponse, Validation } from '../../../presentation/protocols'
import { ListCourses } from '../../../domain/usecases/course/list-courses'
import { serverError, ok } from '../../helpers/http/http-helper'

export class ListCoursesController implements Controller {
  constructor (
    private readonly listCourses: ListCourses,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      this.validation.validate(httpRequest.body)
      const courses = await this.listCourses.list(httpRequest.body)
      return ok(courses)
    } catch (error) {
      return serverError(error)
    }
  }
}
