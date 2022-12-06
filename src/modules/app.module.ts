import { Module } from '@nestjs/common';
import AppController from '@controllers/app.controller';
import { APP_INTERCEPTOR, APP_FILTER, APP_GUARD } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import config from '@infra/config/';
import winstonConfig from '@infra/config/winston.config';
import TypeOrmModule from '@databases/typeorm';
import LoggerInterceptor from '@interceptors/logger.interceptor';
import AllExceptionsFilter from '@exceptions/all-exceptions-filter';
import AuthModule from './auth.module';
import UsersModule from './users.module';


@Module({
  imports: [
    WinstonModule.forRoot(winstonConfig),
    ThrottlerModule.forRoot({
      ttl: config.ratelimit.ttl,
      limit: config.ratelimit.limit,
    }),
    TypeOrmModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export default class AppModule {}
