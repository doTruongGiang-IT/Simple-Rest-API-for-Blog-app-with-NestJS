/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: {
    origin: true,
    preflightContinue: false,
  }});
  await app.listen(3000);
}
bootstrap();
