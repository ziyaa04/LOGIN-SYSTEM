import { Module } from '@nestjs/common';
import { NotExistsValidator } from './not-exists.validator';
import { ExistsValidator } from './exists.validator';
import { RepositoriesModule } from '../repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  providers: [NotExistsValidator, ExistsValidator],
  exports: [NotExistsValidator, ExistsValidator],
})
export class ValidatorsModule {}
