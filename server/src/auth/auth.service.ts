import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Sequelize } from 'sequelize';
import { UserRepository } from '../repositories/user.repository';
import { TokenRepository } from '../repositories/token.repository';
import { MailService } from '../helpers/mail.service';
import { SignUpDto } from './dto/sign-up.dto';
import { UserRoleRepository } from '../repositories/user-role.repository';
import { User } from '../models/user.model';
import { TokenService } from '../helpers/token.service';
import * as bcrypt from 'bcrypt';
import { DbException } from '../exceptions/db.exception';
import DbErrorMessage from '../enums/error-messages/db.error-message.enum';
import { Roles } from '../decorators/roles.decorator';
import RolesEnum from '../enums/roles.enum';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import ValidationErrorMessages from '../enums/error-messages/validation.error-messages.enum';
import { Role } from '../models/role.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository,
    private readonly userRoleRepository: UserRoleRepository,
    private readonly tokenService: TokenService,
    private readonly mailService: MailService,
    @Inject('SEQUELIZE') private readonly sequlize: Sequelize,
  ) {}

  async login(res: Response, loginDto: LoginDto) {
    try {
      // get user
      const user = await this.userRepository.getOneByEmail(loginDto.email, {
        include: { all: true },
      });
      // check user exists
      if (!user)
        throw new BadRequestException({
          email: [ValidationErrorMessages.EmailNotExists],
        });

      // compare password
      const passwordCompare = await bcrypt.compare(
        loginDto.password,
        user.password,
      );
      // check password
      if (!passwordCompare)
        throw new BadRequestException({
          password: [ValidationErrorMessages.wrongPassword],
        });
      const payload = this.tokenService.generatePayload(user);
      const { accessToken, refreshToken } =
        this.tokenService.signTokens(payload);
      // add refreshToken to the db
      await this.tokenRepository.create({
        hash: refreshToken,
        userId: user.id,
      });
      // add token to cookie
      this.tokenService.addRefreshTokenToCookie(res, refreshToken);
      return {
        accessToken,
        refreshToken,
        user: payload,
      };
    } catch (e) {
      if (e instanceof BadRequestException) throw e;
      throw new DbException(DbErrorMessage.wentWrong);
    }
  }

  async signUp(res: Response, signUpDto: SignUpDto) {
    const t = await this.sequlize.transaction();
    try {
      // write user to the db
      const user: User = await this.userRepository.create(
        {
          email: signUpDto.email,
          password: await bcrypt.hash(signUpDto.password, 10),
        },
        {
          transaction: t,
        },
      );
      // add Basic Role to User
      await this.userRoleRepository.create(
        { roleId: 2, userId: user.id },
        { transaction: t },
      );

      const payload = this.tokenService.generatePayload(user, RolesEnum.USER);
      // get tokens
      const { accessToken, refreshToken } =
        this.tokenService.signTokens(payload);
      await this.tokenRepository.create(
        {
          userId: user.id,
          hash: refreshToken,
        },
        { transaction: t },
      );

      await t.commit();
      // add token to the cookie
      this.tokenService.addRefreshTokenToCookie(res, refreshToken);
      // return tokens
      return {
        accessToken,
        refreshToken,
        payload,
      };
    } catch (e) {
      // catch db error and throw it
      await t.rollback();
      throw new DbException(DbErrorMessage.wentWrong);
    }
  }

  async logout(res: Response, hash: string) {
    try {
      const deleted = await this.tokenRepository.deleteOneByHash(hash);
      if (!deleted) throw new Error();
      res.clearCookie('refreshToken');
      return { success: 'Logouted' };
    } catch (e) {
      throw new DbException(DbErrorMessage.wentWrong);
    }
  }

  async refreshToken(res: Response, token: string) {
    if (!token) throw new ForbiddenException();
    try {
      const user = this.tokenService.verifyRefreshToken(token);
      if (!user) {
        await this.tokenRepository.deleteOneByHash(token);
        throw new ForbiddenException();
      }
      const exists = await this.tokenRepository.getOneByHash(token);
      if (!exists) throw new ForbiddenException();
      const tokens = this.tokenService.signTokens(
        this.tokenService.generatePayload(user, ...user.roles),
      );
      return {
        ...tokens,
        user,
      };
    } catch (e) {
      if (e instanceof ForbiddenException) throw e;
      throw new InternalServerErrorException(DbErrorMessage.wentWrong);
    }
    return {};
  }

  sendVerifyMail() {
    return {};
  }

  async verify(res: Response, token: string, hash: string) {
    const t = await this.sequlize.transaction();
    try {
      const update = await this.userRepository.updateOneByHash(
        hash,
        {
          isActivated: true,
        },
        { transaction: t, where: {} },
      );
      if (!update) throw new Error();
      const user = this.tokenService.verifyRefreshToken(token);
      const newToken = this.tokenService.signRefreshToken({
        email: user.email,
        isActivated: true,
        roles: user.roles,
      });
      const updateToken = await this.tokenRepository.updateOneByHash(
        token,
        { hash: newToken },
        { transaction: t, where: {} },
      );
      console.log(updateToken);
      if (!updateToken) throw new Error();
      this.tokenService.addRefreshTokenToCookie(res, newToken);
      await t.commit();
      return {};
    } catch (e) {
      await t.rollback();
      throw new DbException(DbErrorMessage.wentWrong);
    }
    return {};
  }
}
