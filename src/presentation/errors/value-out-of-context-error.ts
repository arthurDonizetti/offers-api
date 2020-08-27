export class ValueOutOfContextError extends Error {
  constructor (paramName: string, context: string[]) {
    super(`Value out of context: ${paramName} - Provide one of accepted values: ${context.toString()}`)
    this.name = 'ValueOutOfContextError'
  }
}
