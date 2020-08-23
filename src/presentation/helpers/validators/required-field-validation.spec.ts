import { RequiredFieldValidation } from './required-field-validation'
import { MissingParamError } from '../../errors'

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('anyField')
    const error = sut.validate({ otherField: 'any_value' })
    expect(error).toEqual(new MissingParamError('anyField'))
  })
})
