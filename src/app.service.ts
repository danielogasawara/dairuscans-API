import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '🚀 API da Dairu Scans pronta para decolar!';
  }
}
