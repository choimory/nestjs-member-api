import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    return (
      'Hello World! - ' +
      'PROFILE:' +
      this.configService.get('PROFILE') +
      ', PORT:' +
      this.configService.get('PORT')
    );
  }
}
