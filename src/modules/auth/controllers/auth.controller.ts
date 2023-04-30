import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CheckEmailExistInterceptor } from '../interceptors/check-email-exist.interceptor';
import { CreateUserDto } from 'src/modules/users/dtos/create-user.dto';
import { UsersService } from 'src/modules/users/services/users.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { LoginRequestInterface } from 'src/common/interfaces/loginRequest.interface';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @UseInterceptors(CheckEmailExistInterceptor)
  registerUsers(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  authenticateUser(@Request() req: LoginRequestInterface) {
    return this.authService.login(req.user);
  }
}
