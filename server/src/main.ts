import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const config = new DocumentBuilder()
    .setTitle('Open Api')
    .setDescription('Open Api Documentation')
    .setVersion('1.0')
    .addTag('LOGIN SYSTEM')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const PORT = process.env.PORT || 5000;
  await app.listen(PORT, () => {
    console.log(`Server is listening ${PORT}  port!`);
  });
}
bootstrap();
