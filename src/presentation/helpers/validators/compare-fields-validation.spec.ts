
import { CompareFieldsValidation } from './compare-fields-validation'
import { InvalidParamError } from '../../errors'

const makeSut = (field: string, fieldToCompare: string): CompareFieldsValidation => {
  return new CompareFieldsValidation(field, fieldToCompare)
}

describe('CompareFields Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut('anyField', 'anyFieldComparation')
    const error = sut.validate({ anyField: 'any_value', anyFieldComparation: 'diferent_value' })
    expect(error).toEqual(new InvalidParamError('anyFieldComparation'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut('anyField', 'anyFieldComparation')
    const error = sut.validate({ anyField: 'any_value', anyFieldComparation: 'any_value' })
    expect(error).toBeFalsy()
  })
})
