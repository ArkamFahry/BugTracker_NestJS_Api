import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getPublic(): string {
    return 'This is a public resource. Welcome visitor!';
  }

  getProtected(): string {
    return 'This is a protected resource. Welcome member';
  }
}
