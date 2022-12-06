import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import ListByIdUsersUseCase from '@useCases/users/listByIdUsers';
import User from '@entities/User';
import FakeUserRepository from '../../../fakes/fakeUser.repository';

describe('ListByIdUsers Unit Tets', () => {
  let listByIdUsersUseCase: ListByIdUsersUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListByIdUsersUseCase,
        {
          provide: 'userRepository',
          useClass: FakeUserRepository,
        },
      ],
    }).compile();

    listByIdUsersUseCase =
      module.get<ListByIdUsersUseCase>(ListByIdUsersUseCase);
  });

  it('ListByIdUsers usecase should be defined', () => {
    expect(listByIdUsersUseCase).toBeDefined();
  });

  it('should return user by id success', async () => {
    const user = {
      id: '123',
      name: 'test',
      username: 'test@gmail.com',
      password: 'teste',
      email: 'test@gmail.com',
      phoneNumber: '99 999999999',
    } as User;
    const params = {
      id: '123',
    };
    const validRequest = { params } as unknown as Request;
    const response = await listByIdUsersUseCase.execute(validRequest);
    expect(response).toStrictEqual(user);
  });

  it('should return BadRequestException (id null)', async () => {
    const params = {
      id: null,
    };
    const invalidRequest = { params } as unknown as Request;
    await expect(
      listByIdUsersUseCase.execute(invalidRequest)
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should return BadRequestException (invalid id)', async () => {
    const params = {
      id: '1234245',
    };
    const invalidRequest = { params } as unknown as Request;
    await expect(
      listByIdUsersUseCase.execute(invalidRequest)
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
