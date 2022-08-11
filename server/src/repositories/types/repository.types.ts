import {
  CreateOptions,
  DropOptions,
  FindOptions,
  UpdateOptions,
  WhereOptions,
} from 'sequelize';

export interface IRepository<T, TAttrs> {
  create(props: TAttrs, options: CreateOptions): Promise<T>;

  getAll(options: FindOptions<T>): Promise<T[] | null>;

  getOneByProps(
    props: WhereOptions<T>,
    options: FindOptions<T>,
  ): Promise<T | null>;

  getOneById(id: number, options: FindOptions<T>): Promise<T | null>;

  updateOneByProps(
    props: TAttrs,
    where: WhereOptions<T>,
    options: UpdateOptions<T>,
  ): Promise<boolean>;

  updateOneById(
    id: number,
    props: TAttrs,
    options: UpdateOptions<T>,
  ): Promise<boolean>;

  deleteOneByProps(
    props: WhereOptions<T>,
    options: DropOptions,
  ): Promise<boolean>;

  deleteOneById(id: number, options: DropOptions): Promise<boolean>;
}
export const DefaultUpdateOptions = {
  where: {},
};
export const DefaultDropOptions = {};
export const DefaultFindOptions = {};
export const DefaultCreateOptions = {};
