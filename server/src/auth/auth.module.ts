import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RepositoriesModule } from '../repositories/repositories.module';
import { HelpersModule } from '../helpers/helpers.module';
import { ValidatorsModule } from '../validators/validators.module';

@Module({
  imports: [RepositoriesModule, HelpersModule, ValidatorsModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
