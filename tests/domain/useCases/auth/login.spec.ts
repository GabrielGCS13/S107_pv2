/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import config from '@infra/config';
import AuthorizationUseCase from '@useCases/auth/authorization';
import { NotFoundException } from '@nestjs/common';
import FakeUserRepository from '../../../fakes/fakeUser.repository';

describe('Auth Unit Tests', () => {
  let auth: AuthorizationUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secretOrPrivateKey: config.jwt.secret,
          signOptions: { expiresIn: config.jwt.expiresIn },
        }),
      ],
      providers: [
        AuthorizationUseCase,
        {
          provide: 'userRepository',
          useClass: FakeUserRepository,
        },
      ],
    }).compile();

    auth = module.get<AuthorizationUseCase>(AuthorizationUseCase);
  });

  it('AuthLogin usecase should be defined', () => {
    expect(auth).toBeDefined();
  });
  it('should loginWithCredentials return valid accessToken', async () => {
    const user = {
      username: 'test@gmail.com',
      password: 'teste',
    };
    const credentials = await auth.loginWithCredentials(user);
    const isValid = await auth.validateToken(credentials);
    expect(isValid.username).toBe(user.username);
  });
  it('should loginWithCredentials throw Error', async () => {
    const user = {
      username: '',
      password: '',
    };
    await expect(auth.loginWithCredentials(user)).rejects.toBeInstanceOf(
      NotFoundException
    );
  });
  it('should validateLogin return false', async () => {
    const user = {
      username: '',
      password: undefined,
    };
    const validUser = await auth.validateUser(user.username, user.password);
    expect(validUser).toBeFalsy();
  });
});
