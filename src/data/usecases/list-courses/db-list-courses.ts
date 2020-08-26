import {
  ListCourses,
  SearchCourseModel,
  SearchCourseResultFormat,
  ListCourseRepository
} from './db-list-courses-protocols'

export class DbListCourses implements ListCourses {
  constructor (private readonly listCourseRepository: ListCourseRepository) {}

  async list (params: SearchCourseModel): Promise<SearchCourseResultFormat[]> {
    const courses = await this.listCourseRepository.list(params)
    return courses
  }
}
