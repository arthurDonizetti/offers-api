import { Validation } from '../../protocols'

export class OptionalFieldValidation implements Validation {
  constructor (
    private readonly fieldName: string
  ) {}

  validate (input: any): Error {
    if (!input[this.fieldName]) {
      input[this.fieldName] = ''
    }
    return null
  }
}
