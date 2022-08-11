import {
  DropOptions,
  FindOptions,
  UpdateOptions,
  WhereOptions,
} from 'sequelize';
import { Role } from '../../models/role.model';

export interface IRoleAttrs {
  id?: number;
  name?: string;
}

export interface IRoleRepository {
  getOneByName(name: string, options: FindOptions): Promise<Role | null>;
  updateOneByName(
    name: string,
    props: IRoleAttrs,
    options: UpdateOptions<Role>,
  ): Promise<boolean>;
  deleteOneByName(
    name: string,
    where: WhereOptions<Role>,
    options: DropOptions,
  ): Promise<boolean>;
}
