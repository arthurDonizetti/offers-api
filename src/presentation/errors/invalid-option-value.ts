export class InvalidOptionValueError extends Error {
  constructor (paramName: string, context: string[]) {
    super(`Invalid Option Value: ${paramName} - Provide one of accepted values: ${context.toString()}`)
    this.name = 'InvalidOptionValueError'
  }
}
