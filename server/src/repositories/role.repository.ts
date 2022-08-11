import { Role } from '../models/role.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IRoleAttrs, IRoleRepository } from './types/role.types';
import {
  DropOptions,
  FindOptions,
  UpdateOptions,
  WhereOptions,
} from 'sequelize';
import {
  DefaultDropOptions,
  DefaultFindOptions,
  DefaultUpdateOptions,
} from './types/repository.types';
import { BaseRepository } from './base.repository';

@Injectable()
export class RoleRepository
  extends BaseRepository<Role, IRoleAttrs>
  implements IRoleRepository
{
  constructor(@InjectModel(Role) model: typeof Role) {
    super(model);
  }

  async deleteOneByName(
    name: string,
    where: WhereOptions<Role>,
    options: DropOptions = DefaultDropOptions,
  ): Promise<boolean> {
    return await this.deleteOneByProps({ name }, options);
  }

  async getOneByName(
    name: string,
    options: FindOptions = DefaultFindOptions,
  ): Promise<Role | null> {
    return await this.getOneByProps({ name }, options);
  }

  async updateOneById(
    id: number,
    props: IRoleAttrs,
    options: UpdateOptions<Role> = DefaultUpdateOptions,
  ): Promise<boolean> {
    return await this.updateOneByProps(props, { id }, options);
  }

  async updateOneByName(
    name: string,
    props: IRoleAttrs,
    options: UpdateOptions<Role> = DefaultUpdateOptions,
  ): Promise<boolean> {
    return await this.updateOneByProps(props, { name }, options);
  }
}
