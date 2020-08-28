import {
  ValidationComposite,
  ContextContainsValueValidation,
  OptionalFieldValidation,
  Validation
} from '../../../presentation/helpers/validators'

export const makeListOffersValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new OptionalFieldValidation('university'))
  validations.push(new OptionalFieldValidation('course'))
  validations.push(new OptionalFieldValidation('city'))
  validations.push(new OptionalFieldValidation('kind'))
  validations.push(new OptionalFieldValidation('level'))
  validations.push(new OptionalFieldValidation('shift'))
  validations.push(new OptionalFieldValidation('order.price_with_discount.direction'))
  validations.push(new ContextContainsValueValidation('order.price_with_discount.direction', ['ASC', 'DESC']))
  return new ValidationComposite(validations)
}
