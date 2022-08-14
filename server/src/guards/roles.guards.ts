import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import RolesEnum from '../enums/roles.enum';

export class RolesGuards implements CanActivate {
  constructor(@Inject(Reflector.name) private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const necessaryRoles =
      this.reflector.get<string[]>('roles', context.getHandler()) ?? [];
    if (necessaryRoles.includes(RolesEnum.ALL)) return true;
    const user = context.switchToHttp().getRequest<Request>()['user'];

    // if not exists role
    if (!necessaryRoles.length) {
      if (!user) return true;
      return false;
    }

    // if user not logged in
    if (!user) return false;
    else {
      // if user logged in
      for (const role of user.roles) {
        if (necessaryRoles.includes(role)) return true;
      }
      return false;
    }
  }
}
