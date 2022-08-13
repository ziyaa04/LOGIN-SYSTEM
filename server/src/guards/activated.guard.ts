import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class ActivatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    return true;
  }
}
