import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import SwaggerConfig from './SwaggerConfig';

function setSwagger(app: INestApplication, params: SwaggerConfig) {
  const config = new DocumentBuilder()
    .setTitle(params.title)
    .setDescription(params.description)
    .setVersion(params.version)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(params.path, app, document);
}

export default setSwagger;
