import CreateUserDTO from '@dtos/User/CreateUserDTO';
import UpdateUserDTO from '@dtos/User/UpdateUserDTO';
import User from '@entities/User';
import { IUserRepository } from '@interfaces/repositories/user.repository';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export default class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async getUserByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  async createUser(user: CreateUserDTO): Promise<void> {
    try {
      await this.userRepository.save(user);
    } catch (error) {
      Logger.error(error.stack, 'CREATE_USER');
      throw new Error(error.code);
    }
  }

  async updateUser(id: string, user: UpdateUserDTO): Promise<number> {
    try {
      const result = await this.userRepository.update({ id }, user);
      return result.affected;
    } catch (error) {
      Logger.error(error.stack, 'UPDATE_USER');
      throw new Error(error.code);
    }
  }
}
