import { CreateAccountDto } from './dto/create-account.dto';
import { HttpStatus, Injectable } from '@nestjs/common';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { isValidString, resultData } from 'src/common/text.helper';
import * as bcrypt from 'bcrypt';
import { Pagination } from 'src/common/dto/index.dto';
import { Position } from '../position/entities/position.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountResposity: Repository<Account>,
  ) {}
  private HASH_ROUND_NUMBER = 5;

  async create(createAccountDto: CreateAccountDto) {
    try {
      if (!isValidString(createAccountDto.username)) {
        return resultData({
          statusCode: HttpStatus.BAD_REQUEST,
          message:
            'Tên đăng nhập phải viết liền không dấu, không có kí tự đặc biệt',
        });
      }

      const checkAccount = await this.accountResposity.findOne({
        where: { username: createAccountDto.username.toLocaleLowerCase() },
      });

      if (!!checkAccount) {
        return resultData({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Tên đăng nhập đã tồn tại',
        });
      }

      const passwordHash = await bcrypt.hashSync(
        createAccountDto.password.trim(),
        this.HASH_ROUND_NUMBER,
      );
      const createAccount = this.accountResposity.create({
        ...createAccountDto,
        role: 0,
        username: createAccountDto.username.toLocaleLowerCase(),
        password: passwordHash,
        team: { ...new Account(), id: createAccountDto.teamId },
      });

      //Join table
      createAccount.positions = createAccountDto.positionIds.map((id) => {
        return { ...new Position(), id };
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...newAccount } = await this.accountResposity.save(
        createAccount,
      );

      return resultData({
        message: 'Tạo tài khoản thành công',
        data: newAccount,
      });
    } catch (err) {
      console.log(err);

      return resultData({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async findAll(query: Pagination) {
    try {
      const position = await this.accountResposity.findAndCount({
        where: [
          {
            username: Like(`%${query?.keyword || ''}%`),
          },
          {
            fullname: Like(`%${query?.keyword || ''}%`),
          },
          {
            positions: {
              id: +query?.keyword || 0,
            },
          },
        ],
        relations: {
          positions: true,
        },
        select: {
          id: true,
          fullname: true,
          createdAt: true,
          updateddAt: true,
          positions: {
            name: true,
            id: true,
          },
        },
        take: query.pageSize,
        skip: (query.page - 1) * query.pageSize,
        order: {
          createdAt: 'DESC',
          fullname: 'ASC',
        },
      });

      return resultData({
        isList: true,
        data: position,
      });
    } catch (error) {
      console.log(error);
      return resultData({
        statusCode: 500,
        message: 'Đã xảy ra lỗi, vui lòng thử lại sau',
      });
    }
  }

  async findOne(id: number) {
    try {
      const account = await this.accountResposity.findOne({
        where: { id },
        relations: {
          positions: true,
        },
      });

      if (!account) {
        return resultData({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Không tìm thấy tài khoản',
        });
      }

      return resultData({
        data: account,
      });
    } catch (error) {
      console.log(error);
      return resultData({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    try {
      const account = await this.accountResposity.findOne({
        where: { id },
      });

      if (!account) {
        return resultData({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Không tìm thấy tài khoản',
        });
      }

      if (updateAccountDto.password) {
        updateAccountDto.password = await bcrypt.hashSync(
          updateAccountDto.password.trim(),
          this.HASH_ROUND_NUMBER,
        );
      }

      this.accountResposity.merge(account, {
        ...updateAccountDto,
        positions: updateAccountDto.positionIds.map((id) => {
          return { ...new Position(), id };
        }),
        team: { ...new Account(), id: updateAccountDto.teamId },
      });

      await this.accountResposity.save(account);

      return resultData({
        message: 'Cập nhật tài khoản thành công',
      });
    } catch (error) {
      console.log(error);
      return resultData({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async remove(id: number) {
    try {
      const account = await this.accountResposity.findOne({
        where: { id },
      });

      if (!account) {
        return resultData({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Không tìm thấy tài khoản',
        });
      }

      await this.accountResposity.delete(id);

      return resultData({
        message: 'Xóa tài khoản thành công',
      });
    } catch (error) {
      console.log(error);
      return resultData({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
