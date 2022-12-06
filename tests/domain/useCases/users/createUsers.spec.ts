import CreateUserDTO from '@dtos/User/CreateUserDTO';
import { Test, TestingModule } from '@nestjs/testing';
import CreateUsersUseCase from '@useCases/users/createUsers';
import { Request } from 'express';
import { BadRequestException } from '@nestjs/common';
import FakeUserRepository from '../../../fakes/fakeUser.repository';

describe('CreateUser Unit Tets', () => {
  let createUsersUseCase: CreateUsersUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUsersUseCase,
        {
          provide: 'userRepository',
          useClass: FakeUserRepository,
        },
      ],
    }).compile();

    createUsersUseCase = module.get<CreateUsersUseCase>(CreateUsersUseCase);
  });

  it('CreateUsersUseCase usecase should be defined', () => {
    expect(createUsersUseCase).toBeDefined();
  });

  it('should return create user success', async () => {
    const validUser = {
      name: 'Gabriel',
      username: 'GabrielTeste',
      email: 'gabriel@hotmail.com',
      phoneNumber: '35 999999999',
      password: '123teste',
    } as CreateUserDTO;
    const validRequest = { body: validUser } as Request;
    const response = await createUsersUseCase.execute(validRequest);
    expect(response).toStrictEqual({ statusCode: 201, message: 'created' });
  });
  it('should return BadRequestException (Missing name)', async () => {
    const invalidUser = {
      username: 'GabrielTeste',
      email: 'gabriel@hotmail.com',
      phoneNumber: '35 999999999',
      password: '123teste',
    } as CreateUserDTO;
    const validRequest = { body: invalidUser } as Request;
    await expect(
      createUsersUseCase.execute(validRequest)
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should return BadRequestException (Missing username)', async () => {
    const invalidUser = {
      name: 'Gabriel',
      email: 'gabriel@hotmail.com',
      phoneNumber: '35 999999999',
      password: '123teste',
    } as CreateUserDTO;
    const validRequest = { body: invalidUser } as Request;
    await expect(
      createUsersUseCase.execute(validRequest)
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should return BadRequestException (Missing password)', async () => {
    const invalidUser = {
      name: 'Gabriel',
      username: 'GabrielTeste',
      email: 'gabriel@hotmail.com',
      phoneNumber: '35 999999999',
    } as CreateUserDTO;
    const validRequest = { body: invalidUser } as Request;
    await expect(
      createUsersUseCase.execute(validRequest)
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
