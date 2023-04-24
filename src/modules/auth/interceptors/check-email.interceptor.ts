import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { UsersService } from 'src/modules/users/services/users.service';

@Injectable()
export class CheckEmailInterceptor implements NestInterceptor {
  constructor(private readonly userService: UsersService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const email = request.body.email;
    const user = await this.userService.findByEmail(email);

    if (user) {
      return throwError(() => new Error('O e-mail já está cadastrado.'));
    }
    return next.handle();
  }
}
