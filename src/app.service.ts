import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    return (
      'Hello World! - ' +
      'NODE_ENV: ' +
      process.env.NODE_ENV +
      ', PORT: ' +
      process.env.PORT
    );
  }
}
