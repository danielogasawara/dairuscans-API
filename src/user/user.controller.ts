import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CheckEmailInterceptor } from './interceptors/check-email.interceptor';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UseInterceptors(CheckEmailInterceptor)
  registerUser(@Body() user: CreateUserDto) {
    this.userService.createUser(user);
    return user;
  }
}
