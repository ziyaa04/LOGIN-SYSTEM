import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
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
import RolesEnum from '../enums/roles.enum';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';
import ValidationErrorMessages from '../enums/error-messages/validation.error-messages.enum';
import MailErrorMessagesEnum from '../enums/error-messages/mail.error-messages.enum';
import { ILoginResponse, ISuccessResponse } from './types/controller.types';
import { ISignPayload } from '../helpers/types/token.types';

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

  async login(res: Response, loginDto: LoginDto): Promise<ILoginResponse> {
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
      await this.tokenRepository.deleteOneByUserId(user.id);
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

  async signUp(res: Response, signUpDto: SignUpDto): Promise<ILoginResponse> {
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

      const payload: ISignPayload = this.tokenService.generatePayload(
        user,
        RolesEnum.USER,
      );
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
        user: payload,
      };
    } catch (e) {
      // catch db error and throw it
      await t.rollback();
      throw new DbException(DbErrorMessage.wentWrong);
    }
  }

  async logout(res: Response, hash: string): Promise<ISuccessResponse> {
    try {
      const deleted = await this.tokenRepository.deleteOneByHash(hash);
      if (!deleted) throw new Error();
      res.clearCookie('refreshToken');
      return { success: 'Logouted' };
    } catch (e) {
      throw new DbException(DbErrorMessage.wentWrong);
    }
  }

  async refreshToken(res: Response, token: string): Promise<ILoginResponse> {
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
  }

  async sendVerifyMail(
    req: Request & { user },
    res: Response,
  ): Promise<ISuccessResponse> {
    try {
      const canSend = this.mailService.checkLastMailTime(req);
      if (!canSend) throw new BadRequestException(MailErrorMessagesEnum.wait);
      const user = await this.userRepository.getOneByEmail(req.user.email);
      const send = await this.mailService.sendVerifyAccountMail(
        user.email,
        user.hash,
      );
      if (!send) throw new Error();
      res.cookie('lastMailTime', Date.now());
      return { success: 'sent' };
    } catch (e) {
      if (e instanceof BadRequestException) throw e;
      throw new InternalServerErrorException(MailErrorMessagesEnum.haveTrouble);
    }
  }

  async verify(res: Response, token: string, hash: string) {
    const t = await this.sequlize.transaction();
    try {
      if (!hash) throw new ForbiddenException();
      const user = await this.userRepository.getOneByHash(hash, {
        include: { all: true },
      });
      if (!user) throw new ForbiddenException();
      if (user.isActivated) throw new NotFoundException();
      const updateUser = await this.userRepository.updateOneById(
        user.id,
        { isActivated: true },
        { transaction: t, where: {} },
      );
      if (!updateUser) throw new Error();
      user.isActivated = true;
      const newToken = this.tokenService.signRefreshToken(
        this.tokenService.generatePayload(user),
      );
      const updateToken = await this.tokenRepository.updateOneByUserId(
        user.id,
        {
          hash: newToken,
        },
        {
          transaction: t,
          where: {},
        },
      );

      if (!updateToken) {
        const createToken = await this.tokenRepository.create(
          { hash: newToken, userId: user.id },
          { transaction: t },
        );
        if (!createToken) throw new Error();
      }

      this.tokenService.addRefreshTokenToCookie(res, newToken);
      await t.commit();
    } catch (e) {
      if (e instanceof HttpException) throw e;
      await t.rollback();
      throw new InternalServerErrorException();
    }
  }
}
