import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { User } from '../models/user.model';

export class RolesGuards implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const necessaryRoles =
      this.reflector.get<string[]>('roles', context.getHandler) ?? [];
    const user: User | null = context.switchToHttp().getRequest<Request>()[
      'user'
    ];
    // if not exists role
    if (!necessaryRoles.length) {
      if (!user) return true;
      return false;
    }

    // if user not logged in
    if (!user) return false;
    else {
      // if user logged in
      for (const role of user.roles)
        if (necessaryRoles.includes(role.name)) return true;
      return false;
    }
  }
}
