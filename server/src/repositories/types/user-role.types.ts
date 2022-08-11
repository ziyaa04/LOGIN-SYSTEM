import { UserRole } from '../../models/user-role.model';
import { DropOptions, FindOptions, UpdateOptions } from 'sequelize';

export interface IUserRoleAttrs {
  id?: number;
  userId?: number;
  roleId?: number;
}

export interface IUserRoleRepository {
  getOneByUserId(
    userId: number,
    options: FindOptions<UserRole>,
  ): Promise<UserRole | null>;
  getOneByRoleId(
    roleId: number,
    options: FindOptions<UserRole>,
  ): Promise<UserRole | null>;
  deleteOneByUserId(userId: number, options: DropOptions): Promise<boolean>;
  deleteOneByRoleId(roleId: number, options: DropOptions): Promise<boolean>;
  updateOneByUserId(
    userId: number,
    props: IUserRoleAttrs,
    options: UpdateOptions<UserRole>,
  ): Promise<boolean>;
  updateOneByRoleId(
    roleId: number,
    props: IUserRoleAttrs,
    options: UpdateOptions<UserRole>,
  ): Promise<boolean>;
}
