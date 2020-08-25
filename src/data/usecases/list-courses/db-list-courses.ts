import { ListCourses, SearchCourseModel } from '../../../domain/usecases/course/list-courses'
import { CourseModel } from '../../../domain/models/course/course-model'
import { ListCourseRepository } from '../../protocols/db/course/list-course-repository'

export class DbListCourses implements ListCourses {
  constructor (private readonly listCourseRepository: ListCourseRepository) {}

  async list (params: SearchCourseModel): Promise<CourseModel[]> {
    const courses = await this.listCourseRepository.list(params)
    return courses
  }
}
