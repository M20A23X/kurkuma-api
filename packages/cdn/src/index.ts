import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';

import { AppModule } from './app.module';

import { ExceptionFilterImpl } from '#/filters';

import { CDN } from '#/static';

async function bootstrap() {
    const app: INestApplication = await NestFactory.create(AppModule);
    app.useGlobalFilters(new ExceptionFilterImpl());
    await app.listen(CDN.port);
}
bootstrap();
