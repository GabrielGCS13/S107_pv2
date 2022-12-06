/* eslint-disable prettier/prettier */
import User from '@entities/User';
import { IUserRepository } from '@interfaces/repositories/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class FakeUserRepository implements IUserRepository {
  fakeUserTable: User[];

  constructor() {
    this.fakeUserTable = [
      {
        id: '123',
        name: 'test',
        username: 'test@gmail.com',
        password: 'teste',
        email: 'test@gmail.com',
        phoneNumber: '99 999999999',
      } as User,
    ];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async getAllUsers(): Promise<User[]> {
    return this.fakeUserTable;
  }

  async getUserById(id: string): Promise<User> {
    const user = this.fakeUserTable.find(userId => userId.id === id);
    return user as unknown as User;
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = this.fakeUserTable.find(
      userId => userId.username === username
    );
    return user as unknown as User;
  }

  async createUser(user: User): Promise<void> {
    this.fakeUserTable.push(user);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async updateUser(id: string, user: User): Promise<number> {
    const userfoundId = this.fakeUserTable.find(
      userId => userId.id === id
    ) as unknown as User;
    this.fakeUserTable.push(userfoundId);
    return 1;
  }
}
