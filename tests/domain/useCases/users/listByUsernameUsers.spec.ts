import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import ListByUsernameUsersUseCase from '@useCases/users/listByUsernameUsers';
import User from '@entities/User';
import FakeUserRepository from '../../../fakes/fakeUser.repository';

describe('ListByUsernameUsers Unit Tets', () => {
  let listByUsernameUsersUseCase: ListByUsernameUsersUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListByUsernameUsersUseCase,
        {
          provide: 'userRepository',
          useClass: FakeUserRepository,
        },
      ],
    }).compile();

    listByUsernameUsersUseCase = module.get<ListByUsernameUsersUseCase>(
      ListByUsernameUsersUseCase
    );
  });

  it('ListByUsernameUsers usecase should be defined', () => {
    expect(listByUsernameUsersUseCase).toBeDefined();
  });

  it('should return user by username success', async () => {
    const user = {
      id: '123',
      name: 'test',
      username: 'test@gmail.com',
      password: 'teste',
      email: 'test@gmail.com',
      phoneNumber: '99 999999999',
    } as User;
    const params = {
      username: 'test@gmail.com',
    };
    const validRequest = { params } as unknown as Request;
    const response = await listByUsernameUsersUseCase.execute(validRequest);
    expect(response).toStrictEqual(user);
  });

  it('should return BadRequestException (username null)', async () => {
    const params = {
      username: null,
    };
    const invalidRequest = { params } as unknown as Request;
    await expect(
      listByUsernameUsersUseCase.execute(invalidRequest)
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should return BadRequestException (invalid username)', async () => {
    const params = {
      username: 'teste',
    };
    const invalidRequest = { params } as unknown as Request;
    await expect(
      listByUsernameUsersUseCase.execute(invalidRequest)
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
