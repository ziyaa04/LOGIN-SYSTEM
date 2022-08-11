import { Injectable } from '@nestjs/common';
import { DropOptions, FindOptions, UpdateOptions } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { UserRole } from '../models/user-role.model';
import { IUserRoleAttrs, IUserRoleRepository } from './types/user-role.types';
import { BaseRepository } from './base.repository';
import {
  DefaultDropOptions,
  DefaultFindOptions,
  DefaultUpdateOptions,
} from './types/repository.types';

@Injectable()
export class UserRoleRepository
  extends BaseRepository<UserRole, IUserRoleAttrs>
  implements IUserRoleRepository
{
  constructor(@InjectModel(UserRole) userRoleModel: typeof UserRole) {
    super(userRoleModel);
  }

  async deleteOneByRoleId(
    roleId: number,
    options: DropOptions = DefaultDropOptions,
  ): Promise<boolean> {
    return await this.deleteOneByProps({ roleId }, options);
  }

  async deleteOneByUserId(
    userId: number,
    options: DropOptions = DefaultDropOptions,
  ): Promise<boolean> {
    return await this.deleteOneByProps({ userId }, options);
  }

  async getOneByRoleId(
    roleId: number,
    options: FindOptions<UserRole> = DefaultDropOptions,
  ): Promise<UserRole | null> {
    return await this.getOneByProps({ roleId }, options);
  }

  async getOneByUserId(
    userId: number,
    options: FindOptions<UserRole> = DefaultFindOptions,
  ): Promise<UserRole | null> {
    return await this.getOneByProps({ userId }, options);
  }

  async updateOneByRoleId(
    roleId: number,
    props: IUserRoleAttrs,
    options: UpdateOptions<UserRole> = DefaultUpdateOptions,
  ): Promise<boolean> {
    return await this.updateOneByProps({ ...props }, { roleId }, options);
  }

  async updateOneByUserId(
    userId: number,
    props: IUserRoleAttrs,
    options: UpdateOptions<UserRole> = DefaultUpdateOptions,
  ): Promise<boolean> {
    return await this.updateOneByProps({ ...props }, { userId }, options);
  }
}
