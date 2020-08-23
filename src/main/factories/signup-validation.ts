import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'
import {
  Validation,
  RequiredFieldValidation,
  CompareFieldsValidation,
  EmailValidation
} from '../../presentation/helpers/validators'
import { EmailValidatorAdapter } from '../../utils/email-validator/email-validator-adapter'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}