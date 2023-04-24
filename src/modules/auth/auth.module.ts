import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersModule } from '../users/users.module';
import { PrismaService } from 'src/common/services/prisma.service';

@Module({
  controllers: [AuthController],
  imports: [UsersModule],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
