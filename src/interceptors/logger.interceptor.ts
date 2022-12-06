import {
  Injectable,
  Inject,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from 'winston';
import { Observable, tap } from 'rxjs';

@Injectable()
export default class LoggerInterceptor implements NestInterceptor {
  constructor(@Inject('winston') private logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    this.logRequest(context.switchToHttp().getRequest());
    return next.handle().pipe(
      tap(data => {
        const delay = Date.now() - now;
        this.logResponse(context.switchToHttp().getResponse(), data, delay);
      })
    );
  }

  private logRequest(req: Request) {
    this.logger.info({
      type: 'REQUEST',
      method: req.method,
      route: req.route.path,
      body: req.body,
      params: req.params,
      query: req.query,
      from: req.ip,
    });
  }

  private getDataType(data: any) {
    const type = typeof data;
    if (type === 'object') {
      if (Array.isArray(data)) return 'array';
    }
    return type;
  }

  private logResponse(res: Response, data: any, delay: Number) {
    const { statusCode } = res;
    const dataType = this.getDataType(data);
    this.logger.info({
      type: 'RESPONSE',
      statusCode,
      dataType,
      data: dataType === 'array' ? `Array size: ${data.length}` : data,
      delay: `${delay}ms`,
    });
  }
}
