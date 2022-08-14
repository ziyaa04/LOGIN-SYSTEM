import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { MailService } from './mail.service';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from '../configs/jwt/jwt-module.config';
import { MailerModule } from '@nestjs-modules/mailer';
import mailConfig from '../configs/mail.config';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: jwtConfig,
    }),
    MailerModule.forRootAsync({
      useFactory: mailConfig,
    }),
  ],
  providers: [TokenService, MailService],
  exports: [TokenService, MailService],
})
export class HelpersModule {}
