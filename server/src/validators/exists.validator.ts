import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
@ValidatorConstraint({ name: 'Exists', async: true })
export class ExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly userRepository: UserRepository) {}
  async validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const [DbProperty] = validationArguments.constraints;
    const exists = await this.userRepository.getOneByProps({
      [`${DbProperty}`]: value,
    });
    return exists ? true : false;
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `Property is not exists!`;
  }
}
