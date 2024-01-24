import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';

import { CDN_PORT } from '#/static';

async function bootstrap() {
    const app: INestApplication = await NestFactory.create(AppModule);
    await app.listen(CDN_PORT);
}
bootstrap();
