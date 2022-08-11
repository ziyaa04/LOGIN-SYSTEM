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

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: jwtConfig,
    }),
    MailerModule.forRootAsync({
      useFactory: mailConfig,
    }),
    SequelizeModule.forFeature([Role]),
  ],
  controllers: [AuthController],
  providers: [RoleRepository, AuthService],
  exports: [],
})
export class AuthModule {}
