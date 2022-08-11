import {
  DefaultCreateOptions,
  DefaultDropOptions,
  DefaultFindOptions,
  DefaultUpdateOptions,
  IRepository,
} from './types/repository.types';
import {
  CreateOptions,
  DropOptions,
  FindOptions,
  UpdateOptions,
  WhereOptions,
} from 'sequelize';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseRepository<T, TAttrs> implements IRepository<T, TAttrs> {
  constructor(protected readonly model) {}

  async create(props: TAttrs, options: CreateOptions = DefaultCreateOptions) {
    return await this.model.create({ ...props }, { ...options });
  }

  async deleteOneById(
    id: number,
    options: DropOptions = DefaultDropOptions,
  ): Promise<boolean> {
    return await this.deleteOneByProps({ id }, options);
  }

  async deleteOneByProps(
    props: WhereOptions<T> | { id: number },
    options: DropOptions = DefaultDropOptions,
  ): Promise<boolean> {
    return await this.model.destroy({ ...options, where: props });
  }

  async getAll(
    options: FindOptions<T> = DefaultFindOptions,
  ): Promise<T[] | null> {
    return await this.model.findAll(options);
  }

  async getOneById(
    id: number,
    options: FindOptions<T> = DefaultFindOptions,
  ): Promise<T | null> {
    return await this.getOneByProps({ id }, options);
  }

  async getOneByProps(
    props: WhereOptions<T> | { id: number },
    options: FindOptions<T> = DefaultFindOptions,
  ): Promise<T | null> {
    return await this.model.findOne({ ...options, where: props });
  }

  async updateOneById(
    id: number,
    props: TAttrs,
    options: UpdateOptions<T> = DefaultUpdateOptions,
  ): Promise<boolean> {
    return await this.updateOneByProps(props, { id }, options);
  }

  async updateOneByProps(
    props: TAttrs,
    where: WhereOptions<T> | { id: number },
    options: UpdateOptions<T> = DefaultUpdateOptions,
  ): Promise<boolean> {
    return await this.model.update({ ...props }, { ...options, where });
  }
}
