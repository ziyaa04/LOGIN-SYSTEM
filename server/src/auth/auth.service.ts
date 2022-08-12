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
    return await this.userRepository.getAll({ include: { all: true } });
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
