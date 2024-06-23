import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  @ApiProperty({ example: 'string' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'string' })
  @IsString()
  fullname: string;

  @ApiProperty({ example: 'string' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'string' })
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty({ example: [1, 2, 3, 4, 5] })
  @IsArray()
  @IsOptional()
  positionIds: number[];

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  teamId: number;
}
