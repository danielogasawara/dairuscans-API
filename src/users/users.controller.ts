import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CheckEmailInterceptor } from './interceptors/check-email.interceptor';

@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  @UseInterceptors(CheckEmailInterceptor)
  registerUsers(@Body() user: CreateUserDto) {
    this.userService.createUser(user);
    return user;
  }
}
