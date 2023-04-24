import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { PrismaService } from 'src/common/services/prisma.service';
import { UtilsModule } from 'src/common/utils/utils.module';

@Module({
  imports: [UtilsModule],
  controllers: [UsersController],
  exports: [UsersService],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
