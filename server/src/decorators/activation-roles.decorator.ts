import { SetMetadata } from '@nestjs/common';

export const ActivationRoles = (...roles) =>
  SetMetadata('activation-roles', roles);
