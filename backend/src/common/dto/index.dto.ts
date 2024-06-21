import { IsInt, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn } from 'typeorm';

export class Pagination {
  @ApiProperty({ default: '', required: false })
  @IsString()
  @IsOptional()
  keyword?: string;

  @ApiProperty({ default: 1 })
  @IsInt()
  @IsOptional()
  page: number;

  @ApiProperty({ default: 10 })
  @IsInt()
  @IsOptional()
  pageSize: number;
}

export class EnityBase {
  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @CreateDateColumn()
  updateddAt: Date;
}
