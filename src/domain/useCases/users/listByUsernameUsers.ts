import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { IUserRepository } from '@interfaces/repositories/user.repository';
import User from '@entities/User';
import { Request } from 'express';

@Injectable()
export default class ListByUsernameUsersUseCase {
  constructor(
    @Inject('userRepository')
    private readonly userRepository: IUserRepository
  ) {}

  async execute(request: Request): Promise<User> {
    const { username } = request.params;
    if (!username)
      throw new BadRequestException('it is necessary to inform the username');
    const users = await this.userRepository.getUserByUsername(username);
    if (!users) throw new NotFoundException();
    return users;
  }
}
