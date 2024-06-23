import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { In, Like, Not, Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { resultData } from 'src/common/text.helper';
import { Account } from '../account/entities/account.entity';
import { Pagination } from 'src/common/dto/index.dto';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  async create(createTeamDto: CreateTeamDto) {
    try {
      const existedTeam = await this.teamRepository.findOne({
        where: {
          name: createTeamDto.name,
        },
      });

      if (existedTeam) {
        return resultData({
          message: 'Team đã tồn tại',
          statusCode: 400,
        });
      }

      const team = this.teamRepository.create({
        ...createTeamDto,
        leader: { ...new Account(), id: createTeamDto.leaderId },
      });

      await this.teamRepository.save(team);

      return resultData({
        message: 'Tạo team thành công',
      });
    } catch (error) {
      console.log(error);
      return resultData({
        message: 'Đã có lỗi xảy ra, vui lòng thử lại sau',
        statusCode: 500,
      });
    }
  }

  async findAll(query: Pagination) {
    try {
      const data = await this.teamRepository.findAndCount({
        where: {
          name: Like(`%${query.keyword || ''}%`),
        },
        relations: {
          leader: true,
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
          leader: {
            id: true,
            fullname: true,
            username: true,
          },
        },
        take: query.pageSize,
        skip: (query.page - 1) * query.pageSize,
        order: {
          createdAt: 'DESC',
        },
      });

      return resultData({
        isList: true,
        data,
      });
    } catch (error) {
      console.log(error);
      return resultData({
        message: 'Đã có lỗi xảy ra, vui lòng thử lại sau',
        statusCode: 500,
      });
    }
  }

  async findOne(id: number) {
    try {
      const team = await this.teamRepository.findOne({
        where: { id },
        relations: {
          leader: true,
          accounts: true,
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
          leader: {
            id: true,
            fullname: true,
            username: true,
          },
          accounts: {
            id: true,
            fullname: true,
            username: true,
          },
        },
      });

      return resultData({
        data: team,
      });
    } catch (error) {
      console.log(error);
      return resultData({
        message: 'Đã có lỗi xảy ra, vui lòng thử lại sau',
        statusCode: 500,
      });
    }
  }

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    try {
      const team = await this.teamRepository.findOne({ where: { id } });
      if (!team) {
        return resultData({
          statusCode: 404,
          message: 'Không tìm thấy team',
        });
      }

      const existedTeam = await this.teamRepository.findOne({
        where: [
          {
            name: updateTeamDto.name,
            id: Not(id),
          },
          {
            leader: {
              id: updateTeamDto.leaderId,
            },
            id: Not(id),
          },
        ],
        relations: {
          leader: true,
        },
      });

      if (existedTeam?.name == updateTeamDto.name) {
        return resultData({
          message: 'Team đã tồn tại',
          statusCode: 400,
        });
      }

      if (existedTeam?.leader?.id === updateTeamDto.leaderId) {
        return resultData({
          message: 'Leader đã thuộc team khác',
          statusCode: 400,
        });
      }

      this.teamRepository.merge(team, {
        ...updateTeamDto,
        leader: { ...new Account(), id: updateTeamDto.leaderId },
      });
      await this.teamRepository.save(team);

      return resultData({
        data: {
          id,
        },
        message: 'Cập nhật team thành công',
      });
    } catch (error) {
      console.log(error);
      return resultData({
        message: 'Đã có lỗi xảy ra, vui lòng thử lại sau',
        statusCode: 500,
      });
    }
  }

  async remove(id: number) {
    try {
      const team = await this.teamRepository.findOne({ where: { id } });
      if (!team) {
        return resultData({
          statusCode: 404,
          message: 'Không tìm thấy team',
        });
      }

      await this.teamRepository.delete(id);
      return resultData({
        message: 'Xóa team thành công',
      });
    } catch (error) {
      console.log(error);
      return resultData({
        message: 'Đã có lỗi xảy ra, vui lòng thử lại sau',
        statusCode: 500,
      });
    }
  }
}
