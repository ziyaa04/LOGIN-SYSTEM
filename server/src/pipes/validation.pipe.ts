import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import ValidationGroups from '../enums/validation-groups.enum';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    if (metadata.type !== 'body') return value;
    const obj = plainToInstance(metadata.metatype, value);
    const validationGroupsKey = Object.keys(ValidationGroups);
    for (const group of validationGroupsKey) {
      const errors = await validate(obj, {
        groups: [ValidationGroups[group]],
      });
      if (errors.length) {
        throw new BadRequestException(this.formatErrors(errors));
      }
    }

    return value;
  }

  formatErrors(errors: ValidationError[]) {
    const res = {};
    for (const error of errors) {
      const constraints = [];
      const errorKeys = Object.keys(error.constraints);
      for (const errorKey of errorKeys) {
        constraints.push(error.constraints[errorKey]);
      }
      res[error.property] = constraints;
    }
    return res;
  }
}
