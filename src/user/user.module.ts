import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/lib/services/prisma.service';
import { UtilsModule } from 'src/lib/utils/utils.module';

@Module({
  imports: [UtilsModule],
  providers: [UserService, PrismaService],
  controllers: [UserController],
})
export class UserModule {}
