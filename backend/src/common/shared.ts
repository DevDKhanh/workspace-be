import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

export class BaseEntityCustom {
  @ApiProperty()
  @CreateDateColumn({ name: 'tg_tao' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'tg_cap_nhat' })
  updatedAt: Date;
}
