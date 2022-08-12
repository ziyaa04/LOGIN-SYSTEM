import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Roles } from '../decorators/roles.decorator';
import RolesEnum from '../enums/roles.enum';
import { RolesGuards } from '../guards/roles.guards';
import { Reflector } from '@nestjs/core';
import { SignUpDto } from './dto/sign-up.dto';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';

@UseGuards(new RolesGuards(new Reflector()))
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Res({ passthrough: true }) res: Response, @Body() loginDto: LoginDto) {
    return this.authService.login(res, loginDto);
  }

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('logout')
  @SetMetadata('roles', [RolesEnum.USER, RolesEnum.ADMIN])
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res, req.cookies.refreshToken);
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
