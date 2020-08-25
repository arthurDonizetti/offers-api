import { Controller, HttpRequest, HttpResponse } from '../../../presentation/protocols'
import { ListCourses } from '../../../domain/usecases/course/list-courses'

export class ListCoursesController implements Controller {
  constructor (private readonly listCourses: ListCourses) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.listCourses.list(httpRequest.body)
    return await new Promise(resolve => resolve(null))
  }
}
