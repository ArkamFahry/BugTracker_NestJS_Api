import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/public')
  getPublic(): string {
    return this.appService.getPublic();
  }

  @Get('/protected')
  getProtected(): string {
    return this.appService.getProtected();
  }
}
