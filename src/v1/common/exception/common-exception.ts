import { HttpException, HttpExceptionOptions } from '@nestjs/common';

export class CommonException extends HttpException {
  author: string;

  constructor(
    msg: string | Record<string, any>,
    code: number,
    author: string,
    options?: HttpExceptionOptions,
  ) {
    super(msg, code, options);
    this.author = author;
  }
}
