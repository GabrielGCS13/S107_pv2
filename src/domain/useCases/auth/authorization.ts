import {
  Injectable,
  Inject,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import AuthLoginDTO from '@dtos/AuthLoginDTO';
import AuthResponseDTO from '@dtos/AuthResponseDTO';
import { IUserRepository } from '@interfaces/repositories/user.repository';

@Injectable()
export default class AuthorizationUseCase {
  constructor(
    private jwtTokenService: JwtService,
    @Inject('userRepository')
    private readonly userRepository: IUserRepository
  ) {}

  async validateToken(auth: AuthResponseDTO) {
    return this.jwtTokenService.verifyAsync(auth.accessToken);
  }

  async validateUser(username: string, password: string) {
    if (!username || !password) {
      return false;
    }
    return true;
  }

  async loginWithCredentials(login: AuthLoginDTO): Promise<AuthResponseDTO> {
    const user = await this.userRepository.getUserByUsername(login.username);
    if (!user) throw new NotFoundException(`User not found`);

    if (user.password !== login.password)
      throw new ForbiddenException(`Wrong credentials`);

    delete user.password;
    return {
      user,
      accessToken: this.jwtTokenService.sign({
        username: user.username,
        userId: user.id,
      }),
    };
  }
}
