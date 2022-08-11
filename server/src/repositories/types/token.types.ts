import { Token } from '../../models/token.model';
import { DropOptions, FindOptions, UpdateOptions } from 'sequelize';

export interface ITokenAttrs {
  id?: number;
  hash?: string;
  userId?: number;
}

export interface ITokenRepository {
  getOneByHash(
    hash: string,
    options: FindOptions<Token>,
  ): Promise<Token | null>;

  getOneByUserId(
    userId: number,
    options: FindOptions<Token>,
  ): Promise<Token | null>;

  deleteOneByHash(hash: string, options: DropOptions): Promise<boolean>;
  deleteOneByUserId(userId: number, options: DropOptions): Promise<boolean>;

  updateOneByHash(
    hash: string,
    props: ITokenAttrs,
    options: UpdateOptions<Token>,
  ): Promise<boolean>;
  updateOneByUserId(
    userId: number,
    props: ITokenAttrs,
    options: UpdateOptions<ITokenAttrs>,
  ): Promise<boolean>;
}
