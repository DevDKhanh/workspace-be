import { IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreatePositionDto {
  @ApiProperty({ example: 'Leader' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Mô tả cho chức vụ', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
