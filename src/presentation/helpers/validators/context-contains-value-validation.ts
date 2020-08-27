import { Validation } from '../../protocols'
import { ValueOutOfContextError } from '../../errors/value-out-of-context-error'

export class ContextContainsValueValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly contextValues: string[]
  ) {}

  validate (input: any): Error {
    if (!this.contextValues.includes(input[this.fieldName])) {
      return new ValueOutOfContextError(this.fieldName, this.contextValues)
    }
  }
}
