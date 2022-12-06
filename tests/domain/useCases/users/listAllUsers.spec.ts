import { Test, TestingModule } from '@nestjs/testing';
import ListAllUsersUseCase from '@useCases/users/listAllUsers';
import FakeUserRepository from '../../../fakes/fakeUser.repository';

describe('ListAllUsers Unit Tets', () => {
  let listAllUsersUseCase: ListAllUsersUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListAllUsersUseCase,
        {
          provide: 'userRepository',
          useClass: FakeUserRepository,
        },
      ],
    }).compile();

    listAllUsersUseCase = module.get<ListAllUsersUseCase>(ListAllUsersUseCase);
  });

  it('ListAllUsers usecase should be defined', () => {
    expect(listAllUsersUseCase).toBeDefined();
  });

  it('should return users list success', async () => {
    const listUsers = [
      {
        id: '123',
        name: 'test',
        username: 'test@gmail.com',
        password: 'teste',
        email: 'test@gmail.com',
        phoneNumber: '99 999999999',
      },
    ];
    const response = await listAllUsersUseCase.execute();
    expect(response).toStrictEqual(listUsers);
  });
});
