import {
  Body,
  Controller,
  Get,
  Param,
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
  signUp(
    @Res({ passthrough: true }) res: Response,
    @Body() signUpDto: SignUpDto,
  ) {
    return this.authService.signUp(res, signUpDto);
  }

  @Roles(RolesEnum.USER, RolesEnum.ADMIN)
  @Post('logout')
  @SetMetadata('roles', [RolesEnum.USER, RolesEnum.ADMIN])
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res, req.cookies.refreshToken);
  }

  @Roles(RolesEnum.ALL)
  @Get('refresh-token')
  refreshToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.refreshToken(res, req?.cookies?.refreshToken);
  }

  @Roles(RolesEnum.USER)
  @Roles(RolesEnum.USER)
  @Post('send-verify-mail')
  sendVerifyMail() {
    return this.authService.sendVerifyMail();
  }

  @Roles(RolesEnum.ALL)
  @Get('verify/:hash')
  verify(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
    @Param('hash') hash: string,
  ) {
    return this.authService.verify(res, req.cookies.refreshToken, hash);
  }
}
