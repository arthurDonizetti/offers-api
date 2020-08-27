import { OptionalFieldValidation } from './optional-field-validation'

const makeSut = (fieldName: string): OptionalFieldValidation => {
  return new OptionalFieldValidation(fieldName)
}

describe('OptionalField Validation', () => {
  test('Should not return if validation succeeds', () => {
    const sut = makeSut('anyField')
    const result = sut.validate({ anyField: 'any_value' })
    expect(result).toBeFalsy()
  })

  test('Should not return if field is not provided', () => {
    const sut = makeSut('anyField')
    const result = sut.validate({ })
    expect(result).toBeFalsy()
  })
})
