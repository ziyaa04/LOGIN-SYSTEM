import { registerDecorator, ValidationOptions } from 'class-validator';
import { NotExistsValidator } from '../not-exists.validator';

export const NotExists =
  (DbProperty: string, validationOptions?: ValidationOptions) =>
  (object: any, propertyName: string) => {
    registerDecorator({
      name: 'NotExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [DbProperty],
      validator: NotExistsValidator,
    });
  };
