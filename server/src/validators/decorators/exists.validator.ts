import { registerDecorator, ValidationOptions } from 'class-validator';
import { ExistsValidator } from '../exists.validator';

export const Exists =
  (DbProperty: string, validationOptions?: ValidationOptions) =>
  (object: any, propertyName: string) => {
    registerDecorator({
      name: 'Exists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [DbProperty],
      validator: ExistsValidator,
    });
  };
