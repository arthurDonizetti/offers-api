import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
  ListCourses,
  serverError,
  badRequest,
  ok
} from './list-courses-protocols'

export class ListCoursesController implements Controller {
  constructor (
    private readonly listCourses: ListCourses,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const courses = await this.listCourses.list(httpRequest.body)
      return ok(courses)
    } catch (error) {
      return serverError(error)
    }
  }
}
