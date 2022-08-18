import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import ValidationErrorMessages from '../../enums/error-messages/validation.error-messages.enum';
import ValidationGroups from '../../enums/validation-groups.enum';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
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
}
