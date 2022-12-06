import CreateUserDTO from '@dtos/User/CreateUserDTO';
import UpdateUserDTO from '@dtos/User/UpdateUserDTO';
import User from '@entities/User';

export interface IUserRepository {
  getAllUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User>;
  getUserByUsername(username: string): Promise<User>;
  createUser(user: CreateUserDTO): Promise<void>;
  updateUser(id: string, user: UpdateUserDTO): Promise<number>;
}
