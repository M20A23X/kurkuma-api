import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';

import { AppModule } from './app.module';

import { ExceptionFilterImpl } from '#/filters';

import { HEALTHY_STUDIO } from '#/static';

async function bootstrap() {
    const app: INestApplication = await NestFactory.create(AppModule);
    app.useGlobalFilters(new ExceptionFilterImpl());
    await app.listen(HEALTHY_STUDIO.port);
}
bootstrap();
