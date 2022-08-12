import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ name: 'Match' })
export class MatchValidator implements ValidatorConstraintInterface {
  validate(value: string, validationArguments?: ValidationArguments): boolean {
    const [property] = validationArguments.constraints;
    return validationArguments.object[property] === value;
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `Confirm password is not equal to the password!`;
  }
}
