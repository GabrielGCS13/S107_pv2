import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';

import ErrorResponse from '../domain/interfaces/IErrorResponse';
import { ICustomHttpExceptionResponse } from './ICustomHttpExceptionReponse';

@Catch()
export default class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const error = this.getHttpException(exception);

    const errorResponse = this.getErrorResponse(error, request);
    const errorLog = this.getErrorLog(errorResponse, request, exception);
    Logger.error(errorLog, 'All Exception FIlter');
    response.status(error.statusCode).json(error);
  }

  private getHttpException(exception: Error): ErrorResponse {
    if (exception instanceof HttpException) {
      const errorResponse = exception.getResponse() as ErrorResponse;
      return {
        statusCode: exception.getStatus(),
        error: errorResponse.error ? errorResponse.error : exception.name,
        message: errorResponse.message
          ? errorResponse.message
          : exception.message,
      };
    }
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Internal Server Error',
      message: exception.message || 'Critical internal server error occurred!',
    };
  }

  private getErrorResponse = (
    error: ErrorResponse,
    request: Request
  ): ICustomHttpExceptionResponse => ({
    statusCode: error.statusCode,
    error: error.error,
    message: error.message,
    path: request.url,
    method: request.method,
    timeStamp: new Date(),
  });

  private getErrorLog = (
    errorResponse: ICustomHttpExceptionResponse,
    request: Request,
    exception: HttpException
  ): string => {
    const { statusCode, error, timeStamp } = errorResponse;
    const { method, url } = request;
    const errorLog = `Time: ${timeStamp}
    Response Code: ${statusCode} - Method: ${method} - URL: ${url}\n
    From IP: ${request.ip ?? 'none'}
    Req Body: ${JSON.stringify(request.body ?? 'empty body')}
    Req Query: ${JSON.stringify(request.query ?? 'empty query')}
    Req Params: ${JSON.stringify(request.params ?? 'empty params')}\n
    ${exception.stack ? exception.stack : error}`;
    return errorLog;
  };
}
