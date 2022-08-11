import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize';
import { UserRepository } from '../repositories/user.repository';
import { TokenRepository } from '../repositories/token.repository';
import { MailService } from '../helpers/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository,
    private readonly mailService: MailService,
    @Inject('SEQUELIZE') private readonly sequlize: Sequelize,
  ) {}

  async login() {
    this.mailService.sendVerifyAccountMail(
      'ziyakerimli04@gmail.com',
      'http://localhost:8000',
    );
    return {};
  }

  signUp() {
    return {};
  }

  logout() {
    return {};
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
