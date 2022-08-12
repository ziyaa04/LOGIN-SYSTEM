import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Roles } from '../decorators/roles.decorator';
import RolesEnum from '../enums/roles.enum';
import { RolesGuards } from '../guards/roles.guards';
import { Reflector } from '@nestjs/core';

@UseGuards(new RolesGuards(new Reflector()))
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login() {
    return this.authService.login();
  }

  @Post('sign-up')
  signUp() {
    return this.authService.signUp();
  }

  @Roles(RolesEnum.USER, RolesEnum.ADMIN)
  @Post('logout')
  logout() {
    return this.authService.logout();
  }

  @Get('refresh-token')
  refreshToken() {
    return this.authService.refreshToken();
  }

  @Roles(RolesEnum.USER)
  @Post('send-verify-mail')
  sendVerifyMail() {
    return this.authService.sendVerifyMail();
  }

  @Get('verify/:hash')
  verify() {
    return this.authService.verify();
  }
}
