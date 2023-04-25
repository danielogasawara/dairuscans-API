import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { env } from 'process';
import { AuthService } from '../services/auth.service';
import { ValidUser } from '../dtos/validUser.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.JWT_SECRET,
    });
  }

  async validate(payload: any): Promise<ValidUser> {
    const user = await this.authService.verifyUserExistence(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
