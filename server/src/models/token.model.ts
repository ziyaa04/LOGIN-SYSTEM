import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table({ tableName: 'tokens', timestamps: false })
export class Token extends Model {
  @Unique
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  id: number;

  @Unique
  @Column({ type: DataType.STRING })
  hash: string;

  @Unique
  @BelongsTo(() => User, 'id')
  @Column({ type: DataType.INTEGER, field: 'user_id' })
  userId: number;

  @HasOne(() => User, 'id')
  user: User;
}
