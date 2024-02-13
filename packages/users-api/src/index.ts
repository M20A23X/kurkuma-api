import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';

import { AppModule } from './app.module';

import { USERS_API } from '#/static';

async function bootstrap() {
    const app: INestApplication = await NestFactory.create(AppModule);
    await app.listen(USERS_API.port);
}
bootstrap();
