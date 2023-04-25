import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UtilsService {
  async encryptPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async comparePassword(password: string, hashInDb: string): Promise<boolean> {
    return await bcrypt.compare(password, hashInDb);
  }
}
