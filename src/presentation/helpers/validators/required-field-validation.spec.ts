import { RequiredFieldValidation } from './required-field-validation'
import { MissingParamError } from '../../errors'

const makeSut = (field: string): RequiredFieldValidation => {
  return new RequiredFieldValidation(field)
}

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut('anyField')
    const error = sut.validate({ otherField: 'any_value' })
    expect(error).toEqual(new MissingParamError('anyField'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut('anyField')
    const result = sut.validate({ anyField: 'any_value' })
    expect(result).toBeFalsy()
  })
})
