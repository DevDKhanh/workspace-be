import { IsNumber, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
  @ApiProperty({ example: 'string' })
  @IsString()
  name: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  leaderId: number;
}
