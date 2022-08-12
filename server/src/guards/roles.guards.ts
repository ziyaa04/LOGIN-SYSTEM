import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

export class RolesGuards implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const necessaryRoles =
      this.reflector.get<string[]>('roles', context.getHandler()) ?? [];
    const user = context.switchToHttp().getRequest<Request>()['user'];
    console.dir({
      necessaryRoles,
      user,
    });
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
