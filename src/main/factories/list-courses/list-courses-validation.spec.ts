import { makeListCoursesValidation } from './list-courses-validation'
import {
  ContextContainsValueValidation,
  OptionalFieldValidation,
  ValidationComposite,
  Validation
} from '../../../presentation/helpers/validators'

jest.mock('../../../presentation/helpers/validators/validation-composite')

describe('ListCoursesValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeListCoursesValidation()
    const validations: Validation[] = []
    validations.push(new OptionalFieldValidation('kind'))
    validations.push(new OptionalFieldValidation('level'))
    validations.push(new OptionalFieldValidation('shift'))
    validations.push(new ContextContainsValueValidation('kind', ['Presencial', 'EaD']))
    validations.push(new ContextContainsValueValidation('level', ['Bacharelado', 'Tecnólogo', 'Licenciatura']))
    validations.push(new ContextContainsValueValidation('shift', ['Manhã', 'Noite', 'Virtual']))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
