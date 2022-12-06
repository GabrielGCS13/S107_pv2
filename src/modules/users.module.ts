import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UsersController from '@controllers/users.controller';
import ListAllUsersUseCase from '@useCases/users/listAllUsers';
import User from '@entities/User';
import UserRepository from '@infra/databases/typeorm/repositories/user.repository';
import CreateUsersUseCase from '@useCases/users/createUsers';
import UpdateUsersUseCase from '@useCases/users/updateUsers';
import ListByUsernameUsersUseCase from '@useCases/users/listByUsernameUsers';
import ListByIdUsersUseCase from '@useCases/users/listByIdUsers';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    {
      provide: 'userRepository',
      useClass: UserRepository,
    },
    ListAllUsersUseCase,
    CreateUsersUseCase,
    UpdateUsersUseCase,
    ListByUsernameUsersUseCase,
    ListByIdUsersUseCase,
  ],
})
export default class UsersModule {}
