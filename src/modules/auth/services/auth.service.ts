import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/services/users.service';
import { ValidateUserDto } from '../dtos/validateUser.dto';
import { UtilsService } from 'src/common/utils/utils.service';
import { ValidUser } from '../dtos/validUser.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly utilsService: UtilsService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: ValidateUserDto): Promise<ValidUser> {
    const user = await this.usersService.findByEmail(email);
    const verify = await this.utilsService.comparePassword(
      password,
      user.password,
    );
    if (!verify) {
      return null;
    }
    return {
      id: user.id,
      name: user.name,
    };
  }

  async verifyUserExistence(id: string): Promise<ValidUser> {
    const user = await this.usersService.findById(id);
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      name: user.name,
      role: user.role,
    };
  }

  async login(user: ValidUser) {
    const payload = { name: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
