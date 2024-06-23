import { Controller, Get, Query } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { FilterService } from './filter.service';
import { Pagination } from 'src/common/dto/index.dto';

@ApiTags('Filter')
@Controller('filter')
export class FilterController {
  constructor(private readonly filterService: FilterService) {}

  @Get('/leader-add-to-team')
  leaderAddToTeam(@Query() query: Pagination) {
    return this.filterService.leaderAddToTeam(query);
  }
}
