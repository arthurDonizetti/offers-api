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
  validations.push(new OptionalFieldValidation('price_with_discount_order_direction'))
  validations.push(new ContextContainsValueValidation('kind', ['Presencial', 'EaD']))
  validations.push(new ContextContainsValueValidation('level', ['Bacharelado', 'Tecnólogo', 'Licenciatura']))
  validations.push(new ContextContainsValueValidation('shift', ['Manhã', 'Noite', 'Virtual']))
  validations.push(new ContextContainsValueValidation('price_with_discount_order_direction', ['ASC', 'DESC']))
  return new ValidationComposite(validations)
}
