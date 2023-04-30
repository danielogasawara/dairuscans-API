import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { UtilsService } from 'src/common/utils/utils.service';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utils: UtilsService,
  ) {}

  async createUser({ name, email, password }: CreateUserDto): Promise<void> {
    const hashedPassword = await this.utils.encryptPassword(password);
    const createUserQuery = await this.prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    if (!createUserQuery) throw new InternalServerErrorException();
  }

  async findByEmail(email: string) {
    return this.prisma.users.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    return this.prisma.users.findUnique({
      where: { id },
    });
  }
}
