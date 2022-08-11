import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { IUserAttrs, IUserRepository } from './types/user.types';
import { DropOptions, FindOptions, UpdateOptions } from 'sequelize';
import {
  DefaultDropOptions,
  DefaultFindOptions,
  DefaultUpdateOptions,
} from './types/repository.types';
import { BaseRepository } from './base.repository';

@Injectable()
export class UserRepository
  extends BaseRepository<User, IUserAttrs>
  implements IUserRepository
{
  constructor(@InjectModel(User) userModel: typeof User) {
    super(userModel);
  }

  async deleteOneByEmail(
    email: string,
    options: DropOptions = DefaultDropOptions,
  ): Promise<boolean> {
    return await this.deleteOneByProps({ email }, options);
  }

  async deleteOneByHash(
    hash: string,
    options: DropOptions = DefaultDropOptions,
  ): Promise<boolean> {
    return await this.deleteOneByProps({ hash }, options);
  }

  async getOneByEmail(
    email: string,
    options: FindOptions = DefaultFindOptions,
  ): Promise<User | null> {
    return await this.getOneByProps({ email }, options);
  }

  async getOneByHash(
    hash: string,
    options: FindOptions = DefaultFindOptions,
  ): Promise<User | null> {
    return await this.getOneByProps({ hash }, options);
  }

  async updateOneByEmail(
    email: string,
    props: IUserAttrs,
    options: UpdateOptions = DefaultUpdateOptions,
  ): Promise<boolean> {
    return await this.updateOneByProps(props, { email }, options);
  }

  async updateOneByHash(
    hash: string,
    props: IUserAttrs,
    options: UpdateOptions = DefaultUpdateOptions,
  ): Promise<boolean> {
    return await this.updateOneByProps(props, { hash }, options);
  }
}
