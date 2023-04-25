import { ValidUser } from 'src/modules/auth/dtos/validUser.dto';

export class LoginRequestInterface extends Request {
  user: ValidUser;
}
