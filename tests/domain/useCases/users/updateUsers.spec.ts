import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { NotFoundException } from '@nestjs/common';
import UpdateUsersUseCase from '@useCases/users/updateUsers';
import UpdateUserDTO from '@dtos/User/UpdateUserDTO';
import FakeUserRepository from '../../../fakes/fakeUser.repository';

describe('UpdateUser Unit Tets', () => {
  let updateUsersUseCase: UpdateUsersUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUsersUseCase,
        {
          provide: 'userRepository',
          useClass: FakeUserRepository,
        },
      ],
    }).compile();

    updateUsersUseCase = module.get<UpdateUsersUseCase>(UpdateUsersUseCase);
  });

  it('UpdateUsersUseCase usecase should be defined', () => {
    expect(updateUsersUseCase).toBeDefined();
  });

  it('should return updated user success', async () => {
    const validUser = {
      name: 'Gabriel',
      username: 'GabrielTeste',
      email: 'gabriel@hotmail.com',
      phoneNumber: '35 999999999',
      password: '123teste',
    } as UpdateUserDTO;
    const params = {
      id: '123',
    };
    const validRequest = { body: validUser, params } as unknown as Request;
    const response = await updateUsersUseCase.execute(validRequest);
    expect(response).toStrictEqual({
      statusCode: 200,
      message: 'user updated',
    });
  });

  it('should return NotFoundException (null id)', async () => {
    const invalidUser = {
      name: 'Gabriel',
    } as UpdateUserDTO;
    const params = {
      id: null,
    };
    const validRequest = { body: invalidUser, params } as unknown as Request;
    await expect(
      updateUsersUseCase.execute(validRequest)
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
