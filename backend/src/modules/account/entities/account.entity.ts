import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { EnityBase } from 'src/common/dto/index.dto';
import { Position } from 'src/modules/position/entities/position.entity';
import { Team } from 'src/modules/team/entities/team.entity';

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
  @Column({ type: 'nvarchar', length: 255, unique: false, nullable: true })
  email: string;

  @ApiProperty()
  @Column({ type: 'varchar', unique: false, nullable: false })
  password: string;

  @ApiProperty()
  @Column({ type: 'tinyint', unique: false, nullable: false, default: 0 })
  role: number;

  @ManyToOne(() => Team, (team) => team.accounts, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'teamId', referencedColumnName: 'id' })
  team: Team;

  @OneToOne(() => Team, (team) => team.leader, {
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL',
  })
  teamLead: Team;

  @ManyToMany(() => Position)
  @JoinTable({
    name: 'account_position',
    joinColumn: { name: 'accountId' },
    inverseJoinColumn: { name: 'positionId' },
  })
  positions: Position[];
}
