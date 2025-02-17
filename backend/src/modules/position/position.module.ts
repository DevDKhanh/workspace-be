import { Module } from '@nestjs/common';
import { Position } from './entities/position.entity';
import { PositionController } from './position.controller';
import { PositionService } from './position.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Position])],
  controllers: [PositionController],
  providers: [PositionService],
})
export class PositionModule {}
