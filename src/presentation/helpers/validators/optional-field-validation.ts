import { Validation } from '../../protocols'

export class OptionalFieldValidation implements Validation {
  constructor (
    private readonly fieldName: string
  ) {}

  validate (input: any): Error {
    return null
  }
}
