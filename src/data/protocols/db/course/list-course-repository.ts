import { ResultFormat } from '../../../../domain/models/course/course-model'
import { SearchCourseModel } from '../../../../domain/usecases/course/list-courses'

export interface ListCourseRepository {
  list: (param: SearchCourseModel) => Promise<ResultFormat[]>
}
