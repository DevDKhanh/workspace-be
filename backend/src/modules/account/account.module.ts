import { Account } from './entities/account.entity';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
