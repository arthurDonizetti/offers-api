import { Validation } from '../../protocols'
import { ValueOutOfContextError } from '../../errors/value-out-of-context-error'

export class ContextContainsValueValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly contextValues: string[]
  ) {}

  validate (input: any): Error {
    const validValue = this.contextValues.filter(acceptedValue =>
      this.normalizeString(acceptedValue.toLowerCase()) === this.normalizeString(input[this.fieldName].toLowerCase()))

    if (validValue.length === 0) {
      return new ValueOutOfContextError(this.fieldName, this.contextValues)
    }
  }

  // https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
  private readonly normalizeString = (value: string): string => {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }
}
