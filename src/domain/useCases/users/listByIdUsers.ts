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
export default class ListByIdUsersUseCase {
  constructor(
    @Inject('userRepository')
    private readonly userRepository: IUserRepository
  ) {}

  async execute(request: Request): Promise<User> {
    const { id } = request.params;
    if (!id) throw new BadRequestException('it is necessary to inform the id');
    const users = await this.userRepository.getUserById(id);
    if (!users) throw new NotFoundException();
    return users;
  }
}
