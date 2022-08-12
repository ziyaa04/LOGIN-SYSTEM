import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from '../configs/jwt/jwt-module.config';
import { MailerModule } from '@nestjs-modules/mailer';
import mailConfig from '../configs/mail.config';
import { RoleRepository } from '../repositories/role.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from '../models/role.model';
import { UserRepository } from '../repositories/user.repository';
import { UserRoleRepository } from '../repositories/user-role.repository';
import { TokenRepository } from '../repositories/token.repository';
import { User } from '../models/user.model';
import { Token } from '../models/token.model';
import { UserRole } from '../models/user-role.model';
import { Sequelize } from 'sequelize-typescript';
import { MailService } from '../helpers/mail.service';
import { TokenService } from '../helpers/token.service';
import { ExistsValidator } from '../validators/exists.validator';
import { NotExistsValidator } from '../validators/not-exists.validator';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: jwtConfig,
    }),
    MailerModule.forRootAsync({
      useFactory: mailConfig,
    }),
    SequelizeModule.forFeature([Role, User, Token, UserRole]),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'SEQUELIZE',
      useExisting: Sequelize,
    },
    NotExistsValidator,
    ExistsValidator,
    TokenService,
    MailService,
    RoleRepository,
    UserRepository,
    UserRoleRepository,
    TokenRepository,
    AuthService,
  ],
  exports: [
    TokenService,
    MailService,
    RoleRepository,
    UserRepository,
    UserRoleRepository,
    TokenRepository,
    {
      provide: 'SEQUELIZE',
      useExisting: Sequelize,
    },
  ],
})
export class AuthModule {}
