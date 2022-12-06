import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsEmail, MinLength } from 'class-validator';

export default class UpdateUserDTO {
  @ApiProperty()
  @IsString()
  @MaxLength(120)
  name?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(120)
  username?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(120)
  phoneNumber?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsString()
  @MinLength(5)
  password?: string;
}
