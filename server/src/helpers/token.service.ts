import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import jwtAccessVerifyConfig from '../configs/jwt/access/jwt-access-verify.config';
import jwtAccessSignConfig from '../configs/jwt/access/jwt-access-sign.config';
import { User } from '../models/user.model';
import { Response } from 'express';

@Injectable()
export class TokenService {
  private readonly accessVerifyConfig: JwtVerifyOptions =
    jwtAccessVerifyConfig();
  private readonly accessSignConfig: JwtSignOptions = jwtAccessSignConfig();
  constructor(private readonly jwtService: JwtService) {}

  sign(payload, options?: JwtSignOptions) {
    if (options) return this.jwtService.sign(payload, options);
    return this.jwtService.sign(payload);
  }

  signAccessToken(payload) {
    return this.sign(payload, this.accessSignConfig);
  }

  signRefreshToken(payload) {
    return this.sign(payload);
  }

  signTokens(payload) {
    return {
      accessToken: this.signAccessToken(payload),
      refreshToken: this.signRefreshToken(payload),
    };
  }

  verifyToken(token, options?: JwtVerifyOptions) {
    try {
      if (options) return this.jwtService.verify(token, options);
      return this.jwtService.verify(token);
    } catch (e) {
      return null;
    }
  }

  verifyAccessToken(authorization = '') {
    const token = authorization.split(' ')[1];
    if (!token) return null;
    return this.verifyToken(token, this.accessVerifyConfig);
  }

  verifyRefreshToken(token) {
    return this.verifyToken(token);
  }

  generatePayload(user: User, ...roles) {
    return {
      email: user.email,
      isActivated: user.isActivated,
      roles: user?.roles?.length
        ? user.roles.map((role) =>
            typeof role === 'string' ? role : role.name,
          )
        : roles,
    };
  }
  addRefreshTokenToCookie(res: Response, refreshToken: string) {
    res.cookie('refreshToken', refreshToken, { httpOnly: true });
  }
}
