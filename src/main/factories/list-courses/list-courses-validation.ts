import {
  ValidationComposite,
  Validation,
  OptionalFieldValidation,
  ContextContainsValueValidation
} from '../../../presentation/helpers/validators'

export const makeListCoursesValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new OptionalFieldValidation('university'))
  validations.push(new OptionalFieldValidation('kind'))
  validations.push(new OptionalFieldValidation('level'))
  validations.push(new OptionalFieldValidation('shift'))
  validations.push(new ContextContainsValueValidation('kind', ['Presencial', 'EaD']))
  validations.push(new ContextContainsValueValidation('level', ['Bacharelado', 'Tecnólogo', 'Licenciatura']))
  validations.push(new ContextContainsValueValidation('shift', ['Manhã', 'Noite', 'Virtual']))
  return new ValidationComposite(validations)
}
