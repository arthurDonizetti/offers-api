import { Validation } from '../../protocols'
import { ValueOutOfContextError } from '../../errors/value-out-of-context-error'

export class ContextContainsValueValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly contextValues: string[]
  ) {}

  validate (input: any): Error {
    const validValue = this.contextValues.filter(acceptedValue => acceptedValue.toLowerCase() === input[this.fieldName].toLowerCase())
    if (validValue.length === 0) {
      return new ValueOutOfContextError(this.fieldName, this.contextValues)
    }
  }
}
