import { UniversityModel } from '../university/university-model'
import { CourseModel } from '../course/course-model'

export interface CampusModel {
  name: string
  city: string
  university: UniversityModel
  courses: CourseModel[]
}
