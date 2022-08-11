import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Token } from '../models/token.model';
import { ITokenAttrs, ITokenRepository } from './types/token.types';
import { DropOptions, FindOptions, UpdateOptions } from 'sequelize';
import { BaseRepository } from './base.repository';
import {
  DefaultDropOptions,
  DefaultFindOptions,
  DefaultUpdateOptions,
} from './types/repository.types';

@Injectable()
export class TokenRepository
  extends BaseRepository<Token, ITokenAttrs>
  implements ITokenRepository
{
  constructor(@InjectModel(Token) tokenModel: typeof Token) {
    super(tokenModel);
  }

  async deleteOneByHash(
    hash: string,
    options: DropOptions = DefaultDropOptions,
  ): Promise<boolean> {
    return await this.deleteOneByProps({ hash }, options);
  }

  async deleteOneByUserId(
    userId: number,
    options: DropOptions = DefaultDropOptions,
  ): Promise<boolean> {
    return await this.deleteOneByProps({ userId }, options);
  }

  async getOneByHash(
    hash: string,
    options: FindOptions<Token> = DefaultFindOptions,
  ): Promise<Token | null> {
    return await this.getOneByProps({ hash }, options);
  }

  async getOneByUserId(
    userId: number,
    options: FindOptions<Token> = DefaultFindOptions,
  ): Promise<Token | null> {
    return await this.getOneByProps({ userId }, options);
  }

  async updateOneByHash(
    hash: string,
    props: ITokenAttrs,
    options: UpdateOptions<Token> = DefaultUpdateOptions,
  ): Promise<boolean> {
    return await this.updateOneByProps(props, { hash }, options);
  }

  async updateOneByUserId(
    userId: number,
    props: ITokenAttrs,
    options: UpdateOptions<Token> = DefaultUpdateOptions,
  ): Promise<boolean> {
    return await this.updateOneByProps(props, { userId }, options);
  }
}
