import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RolesGuards } from '../guards/roles.guards';
import { ActivatedGuard } from '../guards/activated.guard';
import { Roles } from '../decorators/roles.decorator';
import RolesEnum from '../enums/roles.enum';
import ActivationRolesEnum from '../enums/activation-roles.enum';
import { ActivationRoles } from '../decorators/activation-roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
@UseGuards(RolesGuards, ActivatedGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(RolesEnum.USER, RolesEnum.ADMIN)
  @ActivationRoles(ActivationRolesEnum.ACTIVE)
  @Get('all')
  all() {
    return this.userService.all();
  }
}
