import { Validation } from '../../protocols'
import { ValueOutOfContextError } from '../../errors/value-out-of-context-error'

// // https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
// const normalizeString = (value: string): string => {
//   return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
// }

export class ContextContainsValueValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly contextValues: string[]
  ) {}

  validate (input: any): Error {
    if (input[this.fieldName] === '') {
      return null
    }

    const validValue = this.contextValues.filter(acceptedValue =>
      acceptedValue.toLowerCase() === input[this.fieldName].toLowerCase())

    if (validValue.length === 0) {
      return new ValueOutOfContextError(this.fieldName, this.contextValues)
    }
  }
}
