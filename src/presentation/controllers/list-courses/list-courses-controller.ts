import { Controller, HttpRequest, HttpResponse } from '../../../presentation/protocols'
import { ListCourses } from '../../../domain/usecases/course/list-courses'
import { serverError } from '../../helpers/http/http-helper'

export class ListCoursesController implements Controller {
  constructor (private readonly listCourses: ListCourses) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.listCourses.list(httpRequest.body)
      return await new Promise(resolve => resolve(null))
    } catch (error) {
      return serverError(error)
    }
  }
}
