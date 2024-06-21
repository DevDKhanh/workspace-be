import { CreatePositionDto } from './dto/create-position.dto';
import { Injectable } from '@nestjs/common';
import { UpdatePositionDto } from './dto/update-position.dto';
import { resultData } from 'src/common/text.helper';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Position } from './entities/position.entity';
import { Pagination } from 'src/common/dto/index.dto';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
  ) {}

  async create(createPositionDto: CreatePositionDto) {
    try {
      const checkExist = await this.positionRepository.findOne({
        where: { name: createPositionDto.name },
      });

      if (checkExist)
        return resultData({
          statusCode: 400,
          message: 'Chức vụ đã tồn tại',
        });

      const dataSave = await this.positionRepository.save(createPositionDto);
      return resultData({
        data: dataSave,
      });
    } catch (error) {
      return resultData({
        statusCode: 500,
        message: 'Đã xảy ra lỗi, vui lòng thử lại sau',
      });
    }
  }

  async findAll(query: Pagination) {
    try {
      const position = await this.positionRepository.findAndCount({
        where: {
          name: Like(`%${query?.keyword || ''}%`),
        },
        take: query.pageSize,
        skip: (query.page - 1) * query.pageSize,
        order: {
          createdAt: 'DESC',
        },
      });

      return resultData({
        isList: true,
        data: position,
      });
    } catch (error) {
      return resultData({
        statusCode: 500,
        message: 'Đã xảy ra lỗi, vui lòng thử lại sau',
      });
    }
  }

  async findOne(id: number) {
    try {
      const position = await this.positionRepository.findOne({
        where: { id },
        select: ['id', 'name', 'description'],
      });

      if (!position)
        return resultData({
          statusCode: 404,
          message: 'Không tìm thấy chức vụ',
        });

      return resultData({
        data: position,
      });
    } catch (error) {
      return resultData({
        statusCode: 500,
        message: 'Đã xảy ra lỗi, vui lòng thử lại sau',
      });
    }
  }

  async update(id: number, updatePositionDto: UpdatePositionDto) {
    try {
      const checkExist = await this.positionRepository.findOne({
        where: { id },
      });

      if (!checkExist)
        return resultData({
          statusCode: 404,
          message: 'Không tìm thấy chức vụ',
        });

      await this.positionRepository.update(id, updatePositionDto);

      return resultData({
        data: {
          id,
        },
        message: 'Cập nhật chức vụ thành công',
      });
    } catch (error) {
      return resultData({
        statusCode: 500,
        message: 'Đã xảy ra lỗi, vui lòng thử lại sau',
      });
    }
  }

  async remove(id: number) {
    try {
      const checkExist = await this.positionRepository.findOne({
        where: { id },
      });
      if (!checkExist)
        return resultData({
          statusCode: 404,
          message: 'Không tìm thấy chức vụ',
        });

      await this.positionRepository.delete(id);

      return resultData({ message: 'Xóa chức vụ thành công', data: { id } });
    } catch (error) {
      return resultData({
        statusCode: 500,
        message: 'Đã xảy ra lỗi, vui lòng thử lại sau',
      });
    }
  }
}
