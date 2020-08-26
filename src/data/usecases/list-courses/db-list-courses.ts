import {
  ListCourses,
  SearchCourseModel,
  ResultFormat,
  ListCourseRepository
} from './db-list-courses-protocols'

export class DbListCourses implements ListCourses {
  constructor (private readonly listCourseRepository: ListCourseRepository) {}

  async list (params: SearchCourseModel): Promise<ResultFormat[]> {
    const courses = await this.listCourseRepository.list(params)
    return courses
  }
}
