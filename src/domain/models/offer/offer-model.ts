import { CourseModel } from '../course/course-model'
import { UniversityModel } from '../university/university-model'
import { CampusModel } from '../campus/campus-model'

export interface OfferModel {
  full_price: number
  price_with_discount: number
  discount_percentage: number
  start_date: string
  enrollment_semester: string
  enabled: boolean
  course?: CourseModel
  university?: UniversityModel
  campus?: CampusModel
}
