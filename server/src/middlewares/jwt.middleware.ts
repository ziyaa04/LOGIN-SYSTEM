import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { TokenService } from '../helpers/token.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly tokenService: TokenService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const user = this.tokenService.verifyAccessToken(req.headers.authorization);
    req['user'] = user;
    return next();
  }
}
