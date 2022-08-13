import { User } from '../../models/user.model';
import { DropOptions, FindOptions, UpdateOptions } from 'sequelize';

export interface IUserAttrs {
  id?: number;
  email?: string;
  password?: string;
  isActivated?: boolean;
  hash?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IUserRepository {
  getOneByEmail(email: string, options: FindOptions): Promise<User | null>;
  getOneByHash(hash: string, options: FindOptions): Promise<User | null>;
  deleteOneByEmail(email: string, options: DropOptions): Promise<boolean>;
  deleteOneByHash(hash: string, options: DropOptions): Promise<boolean>;
  updateOneByEmail(
    email: string,
    props: IUserAttrs,
    options: UpdateOptions,
  ): Promise<boolean>;
  updateOneByHash(
    hash: string,
    props: IUserAttrs,
    options: UpdateOptions,
  ): Promise<boolean>;
}
