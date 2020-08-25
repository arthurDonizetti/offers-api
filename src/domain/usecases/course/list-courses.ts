import { CourseModel } from '../../models/course/course-model'

export interface SearchCourseModel {
  name: string
  kind: string
  level: string
  shift: string
  university: string
}

export interface ListCourses {
  list: (params: SearchCourseModel) => Promise<CourseModel[]>
}
