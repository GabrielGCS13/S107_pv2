import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import User from '@entities/User';

export default class AuthResponseDTO {
  @ApiProperty()
  @IsString()
  readonly accessToken: string;

  @ApiProperty({ type: () => User })
  @IsString()
  readonly user: User;
}
