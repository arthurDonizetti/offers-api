import { SearchCourseResultFormat } from '../../models/course/course-model'

export interface SearchCourseModel {
  university: string
  kind: string
  level: string
  shift: string
}

export interface ListCourses {
  list: (params: SearchCourseModel) => Promise<SearchCourseResultFormat[]>
}
