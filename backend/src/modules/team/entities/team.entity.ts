import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Account } from 'src/modules/account/entities/account.entity';
import { EnityBase } from 'src/common/dto/index.dto';

@Entity('team')
export class Team extends EnityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => Account, (account) => account.team)
  accounts: Account[];

  @OneToOne(() => Account, (account) => account.teamLead, {
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL',
  })
  @JoinColumn({ name: 'leaderId', referencedColumnName: 'id' })
  leader: Account;
}
