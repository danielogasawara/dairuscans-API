import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { CheckEmailInterceptor } from '../interceptors/check-email.interceptor';
import { CreateUserDto } from 'src/modules/users/dtos/create-user.dto';
import { UsersService } from 'src/modules/users/services/users.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  @UseInterceptors(CheckEmailInterceptor)
  registerUsers(@Body() user: CreateUserDto) {
    this.userService.createUser(user);
    return user;
  }
}
