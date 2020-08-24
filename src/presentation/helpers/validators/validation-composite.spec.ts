import { ValidationComposite } from './validation-composite'
import { MissingParamError, InvalidParamError } from '../../errors'
import { Validation } from '../../protocols/validation'

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: ValidationComposite
  validationStubs: Validation[]
}

const makeSut = (): SutTypes => {
  const validationStubs = [
    makeValidationStub(),
    makeValidationStub()
  ]
  const sut = new ValidationComposite(validationStubs)
  return {
    sut,
    validationStubs
  }
}

describe('Validation Composite', () => {
  test('Should return an error if any Validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({
      field: 'any_value'
    })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should return the first error if more than one Validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new InvalidParamError('field'))
    const error = sut.validate({
      field: 'any_value'
    })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should not return if Validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({
      field: 'any_value'
    })
    expect(error).toBeFalsy()
  })
})
