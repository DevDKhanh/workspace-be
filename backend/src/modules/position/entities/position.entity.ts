import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { EnityBase } from 'src/common/dto/index.dto';

@Entity('position')
export class Position extends EnityBase {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty()
  @Column({ type: 'nvarchar', length: 255, unique: true, nullable: false })
  name: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  description: string;
}
