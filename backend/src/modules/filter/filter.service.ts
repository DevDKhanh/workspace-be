import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../account/entities/account.entity';
import { IsNull, Repository } from 'typeorm';
import { resultData } from 'src/common/text.helper';
import { Pagination } from 'src/common/dto/index.dto';

@Injectable()
export class FilterService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async leaderAddToTeam(query: Pagination) {
    try {
      const accounts = await this.accountRepository.findAndCount({
        where: {
          teamLead: {
            id: IsNull(),
          },
        },
        select: {
          id: true,
          username: true,
          fullname: true,
        },
        take: query.pageSize,
        skip: query.pageSize * (query.page - 1),
      });

      return resultData({
        data: accounts,
        isList: true,
      });
    } catch (error) {
      console.log(error);
      return resultData({
        message: 'Đã có lỗi xảy ra, vui lòng thử lại sau!',
        statusCode: 500,
      });
    }
  }
}
