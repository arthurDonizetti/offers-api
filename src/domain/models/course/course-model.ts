import { CampusModel } from '../campus/campus-model'
import { UniversityModel } from '../university/university-model'

export interface SearchCourseResultFormat {
  course: CourseModel
}

export interface CourseModel {
  name: string
  kind: string
  level: string
  shift: string
  university?: UniversityModel
  campus?: CampusModel
}
