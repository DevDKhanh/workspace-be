import { Account } from '../account/entities/account.entity';
import { FilterController } from './filter.controller';
import { FilterService } from './filter.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  controllers: [FilterController],
  providers: [FilterService],
})
export class FilterModule {}
