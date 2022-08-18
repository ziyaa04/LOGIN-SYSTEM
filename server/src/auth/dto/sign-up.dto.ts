import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import ValidationErrorMessages from '../../enums/error-messages/validation.error-messages.enum';
import ValidationGroups from '../../enums/validation-groups.enum';
import { Match } from '../../validators/decorators/match.decorator';
import { NotExists } from '../../validators/decorators/not-exists.decorator';
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty()
  email: string;

  @IsNotEmpty({
    message: ValidationErrorMessages.emptyPassword,
    groups: [ValidationGroups.primary],
  })
  @Length(8, 20, {
    message: ValidationErrorMessages.passwordLength,
    groups: [ValidationGroups.primary],
  })
  @ApiProperty({
    minLength: 8,
    maxLength: 20,
  })
  password: string;

  @IsNotEmpty({ message: ValidationErrorMessages.confirmPasswordNotMatch })
  @Match('password', {
    message: ValidationErrorMessages.confirmPasswordNotMatch,
    groups: [ValidationGroups.primary],
  })
  @ApiProperty({
    description: 'Must match password!',
  })
  confirm_password: string;
}
