import { CampusModel } from '../campus/campus-model'

export interface CourseModel {
  name: string
  kind: string
  level: string
  shift: string
  campus: CampusModel
}
