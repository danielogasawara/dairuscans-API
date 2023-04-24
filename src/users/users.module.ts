import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/lib/services/prisma.service';
import { UtilsModule } from 'src/lib/utils/utils.module';

@Module({
  imports: [UtilsModule],
  providers: [UsersService, PrismaService],
  controllers: [UsersController],
})
export class UsersModule {}
