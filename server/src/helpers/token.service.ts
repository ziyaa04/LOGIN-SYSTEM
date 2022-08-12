import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import jwtAccessVerifyConfig from '../configs/jwt/access/jwt-access-verify.config';
import jwtAccessSignConfig from '../configs/jwt/access/jwt-access-sign.config';

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
}
