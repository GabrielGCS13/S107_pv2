import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '@infra/config';
import AuthController from '@controllers/auth.controller';
import AuthorizationUseCase from '@useCases/auth/authorization';
import LocalStrategy from '@useCases/auth/local.strategy';
import JwtStrategy from '@useCases/auth/jwt.strategy';
import User from '@entities/User';
import UserRepository from '@infra/databases/typeorm/repositories/user.repository';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: config.jwt.secret,
      signOptions: { expiresIn: config.jwt.expiresIn },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [
    AuthorizationUseCase,
    LocalStrategy,
    JwtStrategy,
    {
      provide: 'userRepository',
      useClass: UserRepository,
    },
  ],
  exports: [AuthorizationUseCase],
})
export default class AuthModule {}
