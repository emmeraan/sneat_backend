import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/app/services/auth/Auth.service';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(private UsersAuthService: AuthService) {
    super({ usernameField: 'email' })
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.UsersAuthService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}