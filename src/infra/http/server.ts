import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';

import AppModule from '@modules/app.module';
import setSwagger from '@infra/http/swagger';
import config from '@infra/config';
import winstonConfig from '@infra/config/winston.config';
import Environment from '@enums/Environment';

async function bootstrap() {
  const logger = WinstonModule.createLogger(winstonConfig);
  const app = await NestFactory.create(AppModule, { logger });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.enableCors({
    allowedHeaders: '*',
    methods: '*',
    origin: '*',
  });

  if (config.app.environment !== Environment.PRD) {
    setSwagger(app, config.swagger);
  }

  await app.listen(config.app.port);
}

bootstrap();
