import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import envConfig from './configs/env.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import dbConfig from './configs/db.config';
import { CsrfMiddleware } from './middlewares/csrf.middleware';
import { JwtMiddleware } from './middlewares/jwt.middleware';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './pipes/validation.pipe';
import { UserModule } from './user/user.module';
import { RepositoriesModule } from './repositories/repositories.module';
import { HelpersModule } from './helpers/helpers.module';
import { ValidatorsModule } from './validators/validators.module';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig()),
    SequelizeModule.forRootAsync({
      useFactory: dbConfig,
    }),
    AuthModule,
    UserModule,
    RepositoriesModule,
    HelpersModule,
    ValidatorsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(CsrfMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.POST,
    });
    consumer.apply(JwtMiddleware).forRoutes('*');
  }
}
