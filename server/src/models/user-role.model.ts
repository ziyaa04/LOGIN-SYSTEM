import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Token } from './token.model';

@Table({ tableName: 'user_roles', timestamps: false })
export class UserRole extends Model {
  @Unique
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  id: number;

  @Unique
  @BelongsTo(() => User, 'id')
  @Column({ type: DataType.INTEGER, field: 'user_id' })
  userId: number;

  @Unique
  @BelongsTo(() => Token, 'id')
  @Column({ type: DataType.INTEGER, field: 'role_id' })
  roleId: number;
}
