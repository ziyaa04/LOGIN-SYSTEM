import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import ActivationRolesEnum from '../enums/activation-roles.enum';
import { ActivationRoles } from '../decorators/activation-roles.decorator';

export class ActivatedGuard implements CanActivate {
  constructor(@Inject(Reflector.name) private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const activationRoles = this.reflector.get<string[]>(
      'activation-roles',
      context.getHandler(),
    );
    if (activationRoles.includes(ActivationRolesEnum.ALL)) return true;
    const isActivated = context.switchToHttp().getRequest<Request & { user }>()
      .user.isActivated;

    if (isActivated && activationRoles.includes(ActivationRolesEnum.ACTIVE))
      return true;
    else if (
      !isActivated &&
      activationRoles.includes(ActivationRolesEnum.NOTACTIVE)
    )
      return true;
    return false;
  }
}
