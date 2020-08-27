import { ContextContainsValueValidation } from './context-contains-value-validation'
import { ValueOutOfContextError } from '../../errors/value-out-of-context-error'

const makeSut = (fieldName: string, contextValues: string[]): ContextContainsValueValidation => {
  return new ContextContainsValueValidation(fieldName, contextValues)
}

describe('ContextContainsValue Validation', () => {
  test('Should return a ValueOutOfContextError if validation fails', () => {
    const fieldName = 'anyField'
    const context = ['first_value', 'second_value', 'third_value']
    const sut = makeSut(fieldName, context)
    const error = sut.validate({ anyField: 'other_value' })
    expect(error).toEqual(new ValueOutOfContextError(fieldName, context))
  })
})
