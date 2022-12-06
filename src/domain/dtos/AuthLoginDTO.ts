import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class AuthLoginDTO {
  @ApiProperty()
  @IsString()
  readonly username: string;

  @ApiProperty()
  @IsString()
  readonly password: string;
}
