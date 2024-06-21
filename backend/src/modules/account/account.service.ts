import { CreateAccountDto } from './dto/create-account.dto';
import { HttpStatus, Injectable } from '@nestjs/common';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isValidString, resultData } from 'src/common/text.helper';
import * as bcrypt from 'bcrypt';

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
        username: createAccountDto.username.toLocaleLowerCase(),
        password: passwordHash,
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...newAccount } = await this.accountResposity.save(
        createAccount,
      );

      return resultData({
        statusCode: HttpStatus.CREATED,
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
}
