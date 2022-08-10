import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { UserRole } from './user-role.model';
import { Token } from './token.model';

@Table({
  tableName: 'users',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: false,
})
export class User extends Model {
  @Unique
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  id: number;

  @Unique
  @AllowNull(false)
  @Column({ type: DataType.STRING })
  email: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  password: string;

  @AllowNull(false)
  @Default(false)
  @Column({ type: DataType.BOOLEAN, field: 'is_activated' })
  isActivated: boolean;

  @Unique
  @Default(() => uuidv4())
  @Column({ type: DataType.STRING })
  hash: string;

  @HasMany(() => UserRole)
  roles: UserRole[];

  @HasOne(() => Token)
  token: Token;
}
