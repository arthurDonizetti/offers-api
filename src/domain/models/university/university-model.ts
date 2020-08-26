import { CampusModel } from '../campus/campus-model'

export interface UniversityModel {
  name: string
  score: number
  logo_url: string
  campus?: CampusModel[]
}
