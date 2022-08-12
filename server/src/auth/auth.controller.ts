import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Roles } from '../decorators/roles.decorator';
import RolesEnum from '../enums/roles.enum';

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

  @Roles()
  @Post('send-verify-mail')
  sendVerifyMail() {
    return this.authService.sendVerifyMail();
  }

  @Get('verify/:hash')
  verify() {
    return this.authService.verify();
  }
}
