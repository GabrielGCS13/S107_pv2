import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '@interfaces/repositories/user.repository';
import User from '@entities/User';

@Injectable()
export default class ListAllUsersUseCase {
  constructor(
    @Inject('userRepository')
    private readonly userRepository: IUserRepository
  ) {}

  async execute(): Promise<User[]> {
    const users = await this.userRepository.getAllUsers();
    return users;
  }
}
