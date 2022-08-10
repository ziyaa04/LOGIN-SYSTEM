import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';
import { UserRole } from '../models/user-role.model';
import { Token } from '../models/token.model';

export default (): SequelizeModuleOptions => ({
  dialect: process.env.DB_DIALECT as 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  models: [User, Role, UserRole, Token],
  autoLoadModels: true,
  logging: Boolean(process.env.DB_LOG),
});
