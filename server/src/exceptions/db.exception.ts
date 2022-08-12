import { InternalServerErrorException } from '@nestjs/common';

export class DbException extends InternalServerErrorException {
  constructor(message) {
    super(message);
  }
}
