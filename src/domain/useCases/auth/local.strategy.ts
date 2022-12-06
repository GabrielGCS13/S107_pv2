import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import AuthorizationUseCase from '@useCases/auth/authorization';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private auth: AuthorizationUseCase) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.auth.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
