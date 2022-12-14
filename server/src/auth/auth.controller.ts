import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Roles } from '../decorators/roles.decorator';
import RolesEnum from '../enums/roles.enum';
import { RolesGuards } from '../guards/roles.guards';
import { SignUpDto } from './dto/sign-up.dto';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { ActivationRoles } from '../decorators/activation-roles.decorator';
import ActivationRolesEnum from '../enums/activation-roles.enum';
import { ActivatedGuard } from '../guards/activated.guard';
import { ILoginResponse, ISuccessResponse } from './types/controller.types';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@UseGuards(RolesGuards, ActivatedGuard)
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: LoginDto })
  login(
    @Res({ passthrough: true }) res: Response,
    @Body() loginDto: LoginDto,
  ): Promise<ILoginResponse> {
    return this.authService.login(res, loginDto);
  }

  @Post('sign-up')
  @ApiBody({
    type: SignUpDto,
  })
  signUp(
    @Res({ passthrough: true }) res: Response,
    @Body() signUpDto: SignUpDto,
  ): Promise<ILoginResponse> {
    return this.authService.signUp(res, signUpDto);
  }

  @Roles(RolesEnum.USER, RolesEnum.ADMIN)
  @Post('logout')
  logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ISuccessResponse> {
    return this.authService.logout(res, req.cookies.refreshToken);
  }

  @Roles(RolesEnum.ALL)
  @Get('refresh-token')
  refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ILoginResponse> {
    return this.authService.refreshToken(res, req?.cookies?.refreshToken);
  }

  @ActivationRoles(ActivationRolesEnum.NOTACTIVE)
  @Roles(RolesEnum.USER)
  @Post('send-verify-mail')
  sendVerifyMail(
    @Req() req: Request & { user },
    @Res({ passthrough: true }) res: Response,
  ): Promise<ISuccessResponse> {
    return this.authService.sendVerifyMail(req, res);
  }

  @Roles(RolesEnum.ALL)
  @Get('verify/:hash')
  @Redirect(process.env.CLIENT_URL)
  verify(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
    @Param('hash') hash: string,
  ) {
    return this.authService.verify(res, req.cookies.refreshToken, hash);
  }
}
