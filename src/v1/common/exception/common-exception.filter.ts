import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { CommonException } from './common-exception';

@Catch(CommonException)
export class CommonExceptionFilter implements ExceptionFilter {
  catch(commonException: CommonException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    response.status(commonException.getStatus()).json({
      code: commonException.getStatus(),
      msg: commonException.message,
      timestamp: new Date().toISOString(),
      path: request.url,
      author: commonException.author,
    });
  }
}
