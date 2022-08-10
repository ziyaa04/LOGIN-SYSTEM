import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Token } from './token.model';
import { User } from './user.model';
import { Role } from './role.model';

@Table({ tableName: 'user_roles', timestamps: false })
export class UserRole extends Model {
  @Unique
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  id: number;

  @Unique
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, field: 'user_id' })
  userId: number;

  @Unique
  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER, field: 'role_id' })
  roleId: number;

  @BelongsTo(() => User)
  user: User;
  @BelongsTo(() => Role)
  role: Role;
}
