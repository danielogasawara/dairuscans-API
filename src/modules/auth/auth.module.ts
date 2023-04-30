import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { UtilsModule } from 'src/common/utils/utils.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserHaveJwtTokenMiddleware } from './middlewares/userHaveJwtToken.middleware';

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    UtilsModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: env.EXPIRES_JWT_TOKEN },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserHaveJwtTokenMiddleware)
      .forRoutes('auth/login', 'auth/register');
  }
}
