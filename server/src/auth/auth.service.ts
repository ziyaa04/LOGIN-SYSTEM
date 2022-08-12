import { BadRequestException, Inject, Injectable } from '@nestjs/common';
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
      const payload = {
        email: user.email,
        roles: user.roles.map((role) => (console.log(role.name), role.name)),
        isActivated: user.isActivated,
      };
      const { accessToken, refreshToken } =
        this.tokenService.signTokens(payload);
      // add refreshToken to the db
      await this.tokenRepository.create({
        hash: refreshToken,
        userId: user.id,
      });

      return {
        accessToken,
        refreshToken,
        user: payload,
      };
    } catch (e) {
      console.log(e);
      if (e instanceof BadRequestException) throw e;
      throw new DbException(DbErrorMessage.wentWrong);
    }
  }

  async signUp(signUpDto: SignUpDto) {
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

      const signObject = {
        email: user.email,
        isActivated: user.isActivated,
        roles: [RolesEnum.USER],
      };
      // get tokens
      const { accessToken, refreshToken } =
        this.tokenService.signTokens(signObject);
      await this.tokenRepository.create(
        {
          userId: user.id,
          hash: refreshToken,
        },
        { transaction: t },
      );

      await t.commit();
      // return tokens
      return {
        accessToken,
        refreshToken,
        signObject,
      };
    } catch (e) {
      console.log(e);
      // catch db error and throw it
      await t.rollback();
      throw new DbException(DbErrorMessage.wentWrong);
    }
  }

  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
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

  refreshToken() {
    return {};
  }

  sendVerifyMail() {
    return {};
  }

  verify() {
    return {};
  }
}
