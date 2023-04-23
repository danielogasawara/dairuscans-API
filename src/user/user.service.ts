import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/lib/services/prisma.service';
import { UtilsService } from 'src/lib/utils/utils.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utils: UtilsService,
  ) {}

  async createUser({ name, email, password }: CreateUserDto) {
    const hashedPassword = await this.utils.encryptPassword(password);
    return this.prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.users.findUnique({
      where: { email },
    });
  }
}
