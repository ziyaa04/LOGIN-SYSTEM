import {
  AllowNull,
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { UserRole } from './user-role.model';
import { User } from './user.model';

@Table({ tableName: 'roles', timestamps: false })
export class Role extends Model {
  @Unique
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  id: number;

  @Unique
  @AllowNull(false)
  @Column({ type: DataType.STRING })
  name: string;

  @BelongsToMany(() => User, () => UserRole)
  users: User[];
}
