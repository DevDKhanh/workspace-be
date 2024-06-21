import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Account } from '../account/entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { resultData } from 'src/common/text.helper';
import { LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account)
    private accountResposity: Repository<Account>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.accountResposity.findOne({ where: { username } });

    /********** Check Password Usename **********/
    if (!user || !bcrypt.compareSync(pass.trim(), user.password)) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async login(loginDto: LoginDto) {
    const user = await this.accountResposity.findOne({
      where: { username: loginDto.username },
    });

    if (!user || !bcrypt.compareSync(loginDto.password.trim(), user.password)) {
      return resultData({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Tài khoản hoặc mật khẩu không chính xác',
      });
    }

    const { password, ...data } = user;

    return {
      access_token: this.jwtService.sign(data),
      ...data,
    };
  }
}
