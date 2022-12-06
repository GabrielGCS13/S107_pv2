import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { IUserRepository } from '@interfaces/repositories/user.repository';
import { Request } from 'express';
import UpdateUserDTO from '@dtos/User/UpdateUserDTO';
import OKResponseDTO from '@dtos/OKResponseDTO';

@Injectable()
export default class UpdateUsersUseCase {
  constructor(
    @Inject('userRepository')
    private readonly userRepository: IUserRepository
  ) {}

  async execute(request: Request): Promise<OKResponseDTO> {
    const user: UpdateUserDTO = request.body;
    const { id } = request.params;

    if (!id) throw new NotFoundException('it is necessary to inform the id');
    if (!user.name) throw new BadRequestException('name must be valid');
    if (!user.username) throw new BadRequestException('username must be valid');
    if (user.password) delete user.password;

    try {
      const result = await this.userRepository.updateUser(id, user);
      if (result === 0) {
        throw new NotFoundException('Token not found');
      }
      return {
        statusCode: 200,
        message: 'user updated',
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
