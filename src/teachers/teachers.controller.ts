import { Body, Controller, Get, Put } from '@nestjs/common';

import { TeachersService } from './teachers.service';
import { PutTeachersDto } from './dto/put-teachers.dto';
import { ResultStatus } from '../../common/types/ResultStatus';
import { GetTeachersResultDto } from './dto/get-teachers-result.dto';

@Controller('teachers')
export class TeachersController {
  constructor(private teachersService: TeachersService) {}

  @Get()
  async getTeachers(): Promise<GetTeachersResultDto> {
    return await this.teachersService.getAll();
  }

  @Put()
  async updateTeachers(
    @Body() teachers: PutTeachersDto,
  ): Promise<ResultStatus> {
    const promises = teachers.map(async (teacher) => {
      return await this.teachersService.teacherCDU(teacher);
    });

    await Promise.all(promises);

    return {
      status: 'success',
    };
  }
}
