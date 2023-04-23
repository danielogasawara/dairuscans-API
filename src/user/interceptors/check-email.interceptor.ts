import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UserService } from '../user.service';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class CheckEmailInterceptor implements NestInterceptor {
  constructor(private readonly userService: UserService) {}

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