
import OkResponse from '@interfaces/IOkResponse';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export default class OKResponseDTO implements OkResponse {
  @ApiProperty()
  @IsNumber()
  readonly statusCode: number;

  @ApiProperty()
  readonly message: string;
}