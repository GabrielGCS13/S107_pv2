import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { IUserRepository } from '@interfaces/repositories/user.repository';
import CreateUserDTO from '@dtos/User/CreateUserDTO';
import { Request } from 'express';
import OKResponseDTO from '@dtos/OKResponseDTO';

@Injectable()
export default class CreateUsersUseCase {
  constructor(
    @Inject('userRepository')
    private readonly userRepository: IUserRepository
  ) {}

  async execute(request: Request): Promise<OKResponseDTO> {
    const user: CreateUserDTO = request.body;

    if (!user.name) throw new BadRequestException('name must be valid');
    if (!user.password) throw new BadRequestException('password must be valid');
    if (!user.username) throw new BadRequestException('username must be valid');
    try {
      await this.userRepository.createUser(user);
      return {
        statusCode: 201,
        message: 'created',
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
