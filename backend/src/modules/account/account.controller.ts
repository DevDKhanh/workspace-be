import {
  Controller,
  Post,
  Body,
  Ip,
  Get,
  Query,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { ApiTags } from '@nestjs/swagger';
import { Pagination } from 'src/common/dto/index.dto';

@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @Get()
  finAll(@Query() query: Pagination) {
    return this.accountService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.accountService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateAccountDto: CreateAccountDto) {
    return this.accountService.update(id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.accountService.remove(id);
  }
}
