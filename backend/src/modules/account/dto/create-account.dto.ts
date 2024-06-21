import { IsInt, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  @ApiProperty({ example: 'string' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'string' })
  @IsString()
  password: string;

  @ApiProperty({ example: 0 })
  @IsInt()
  role: number;
}
