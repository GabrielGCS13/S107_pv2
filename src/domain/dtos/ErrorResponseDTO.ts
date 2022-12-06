import ErrorResponse from '@interfaces/IErrorResponse';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export default class ErrorResponseDTO implements ErrorResponse {
  @ApiProperty()
  @IsNumber()
  readonly statusCode: number;

  @ApiProperty()
  @IsString()
  readonly error: string;

  @ApiProperty()
  readonly message: string | object;
}
