import { Controller, Get, Post, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service';

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

  @Post('logout')
  logout() {
    return this.authService.logout();
  }

  @Get('refresh-token')
  refreshToken() {
    return this.authService.refreshToken();
  }

  @Post('send-verify-mail')
  sendVerifyMail() {
    return this.authService.sendVerifyMail();
  }

  @Get('verify/:hash')
  verify() {
    return this.authService.verify();
  }
}
