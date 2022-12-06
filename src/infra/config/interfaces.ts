import { TypeOrmModuleOptions } from '@nestjs/typeorm';

declare interface Application {
  environment: string;
  port: number;
}

declare interface JSONWebToken {
  secret: string;
  expiresIn: string;
}

declare interface Swagger {
  title: string;
  description: string;
  version: string;
  tag: string;
  path: string;
}

declare interface RateLimit {
  ttl: number;
  limit: number;
}

export interface Config {
  app: Application;
  jwt: JSONWebToken;
  swagger: Swagger;
  ratelimit: RateLimit;
  typeOrmDb: TypeOrmModuleOptions;
}
