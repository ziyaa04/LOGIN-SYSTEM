import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from '../models/role.model';
import { User } from '../models/user.model';
import { Token } from '../models/token.model';
import { UserRole } from '../models/user-role.model';
import { RoleRepository } from './role.repository';
import { UserRepository } from './user.repository';
import { UserRoleRepository } from './user-role.repository';
import { TokenRepository } from './token.repository';
import { Sequelize } from 'sequelize-typescript';

@Module({
  imports: [SequelizeModule.forFeature([Role, User, Token, UserRole])],
  providers: [
    {
      provide: 'SEQUELIZE',
      useExisting: Sequelize,
    },
    RoleRepository,
    UserRepository,
    UserRoleRepository,
    TokenRepository,
  ],
  exports: [
    {
      provide: 'SEQUELIZE',
      useExisting: Sequelize,
    },
    RoleRepository,
    UserRepository,
    UserRoleRepository,
    TokenRepository,
  ],
})
export class RepositoriesModule {}
