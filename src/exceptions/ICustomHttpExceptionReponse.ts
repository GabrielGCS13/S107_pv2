import ErrorResponse from '../domain/interfaces/IErrorResponse';

export interface ICustomHttpExceptionResponse extends ErrorResponse {
  path: string;
  method: string;
  timeStamp: Date;
}
