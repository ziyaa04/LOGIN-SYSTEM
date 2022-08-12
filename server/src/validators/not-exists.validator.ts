import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
@ValidatorConstraint({ name: 'NotExists', async: true })
export class NotExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly userRepository: UserRepository) {}
  async validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const [DbProperty] = validationArguments.constraints;
    const exists = await this.userRepository.getOneByProps({
      [`${DbProperty}`]: value,
    });
    return exists ? false : true;
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `Property already exists!`;
  }
}
