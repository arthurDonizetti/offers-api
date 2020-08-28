import { makeListOffersValidation } from './list-offers-validation'
import {
  OptionalFieldValidation,
  ValidationComposite,
  ContextContainsValueValidation,
  Validation
} from '../../../presentation/helpers/validators'

jest.mock('../../../presentation/helpers/validators/validation-composite')

describe('ListOffersValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeListOffersValidation()
    const validations: Validation[] = []
    validations.push(new OptionalFieldValidation('university'))
    validations.push(new OptionalFieldValidation('course'))
    validations.push(new OptionalFieldValidation('city'))
    validations.push(new OptionalFieldValidation('kind'))
    validations.push(new OptionalFieldValidation('level'))
    validations.push(new OptionalFieldValidation('shift'))
    validations.push(new OptionalFieldValidation('order.price_with_discount.direction'))
    validations.push(new ContextContainsValueValidation('order.price_with_discount.direction', ['ASC', 'DESC']))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
