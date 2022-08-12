import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import ValidationErrorMessages from '../../enums/error-messages/validation.error-messages.enum';
import ValidationGroups from '../../enums/validation-groups.enum';
import { Match } from '../../validators/decorators/match.decorator';
import { Exists } from '../../validators/decorators/exists.validator';
import { NotExists } from '../../validators/decorators/not-exists.decorator';

export class SignUpDto {
  @IsEmail(
    {},
    {
      message: ValidationErrorMessages.invalidEmailFormat,
      groups: [ValidationGroups.primary],
    },
  )
  @IsNotEmpty({
    message: ValidationErrorMessages.emptyEmail,
    groups: [ValidationGroups.primary],
  })
  @NotExists('email', {
    message: ValidationErrorMessages.EmailAlreadyExists,
    groups: [ValidationGroups.secondary],
  })
  email: string;

  @IsNotEmpty({
    message: ValidationErrorMessages.emptyPassword,
    groups: [ValidationGroups.primary],
  })
  @Length(8, 20, {
    message: ValidationErrorMessages.passwordLength,
    groups: [ValidationGroups.primary],
  })
  password: string;

  @IsNotEmpty({ message: ValidationErrorMessages.confirmPasswordNotMatch })
  @Match('password', {
    message: ValidationErrorMessages.confirmPasswordNotMatch,
    groups: [ValidationGroups.primary],
  })
  confirm_password: string;
}
