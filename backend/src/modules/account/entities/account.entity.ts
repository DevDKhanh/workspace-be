import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { EnityBase } from 'src/common/dto/index.dto';

@Entity({ name: 'account' })
export class Account extends EnityBase {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty()
  @Column({ type: 'nvarchar', length: 255, unique: true, nullable: false })
  username: string;

  @ApiProperty()
  @Column({ type: 'nvarchar', length: 255, unique: false, nullable: true })
  fullname: string;

  @ApiProperty()
  @Column({ type: 'varchar', unique: true, nullable: false })
  password: string;

  @ApiProperty()
  @Column({ type: 'tinyint', unique: true, nullable: false, default: 0 })
  role: number;
}
