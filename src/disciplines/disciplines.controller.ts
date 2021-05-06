import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';

import { DisciplinesService } from './disciplines.service';

import { Response } from 'express';
import { ResultStatus } from '../../common/types/ResultStatus';

import { UpdateDisciplineWithTeachersDto } from './dto/update-discipline-with-teachers.dto';
import { CreateDisciplineWithTeachersDto } from './dto/create-discipline-with-teachers.dto';
import { GetDisciplineGroupsResultDto } from './dto/get-discipline-groups-result.dto';

@Controller('disciplines')
export class DisciplinesController {
  constructor(private disciplinesService: DisciplinesService) {}

  @Get()
  async getDisciplinesWithTeachers() {
    return this.disciplinesService.getDisciplinesWithTeachers();
  }

  @Post()
  async createDisciplineWithTeachers(
    @Body() createDisciplineWithTeachersDto: CreateDisciplineWithTeachersDto,
  ): Promise<ResultStatus> {
    await this.disciplinesService.createDisciplineWithTeachers(
      createDisciplineWithTeachersDto,
    );

    return {
      status: 'success',
    };
  }

  @Put(':disciplineId')
  async updateDisciplineWithTeachers(
    @Param('disciplineId') disciplineId: string,
    @Body() updateDisciplineWithTeachersDto: UpdateDisciplineWithTeachersDto,
  ): Promise<ResultStatus> {
    await this.disciplinesService.updateDisciplineWithTeachers(
      disciplineId,
      updateDisciplineWithTeachersDto,
    );

    return {
      status: 'success',
    };
  }

  @Delete(':disciplineId')
  async deleteDisciplineWithTeachers(
    @Param('disciplineId') disciplineId: string,
  ): Promise<ResultStatus> {
    await this.disciplinesService.deleteDisciplineWithTeachers(disciplineId);

    return {
      status: 'success',
    };
  }

  @Get(':disciplineId/students')
  async getStudentsWithDiscipline(@Param() params) {
    return this.disciplinesService.getStudentsWithDiscipline(
      params.disciplineId,
    );
  }

  @Put(':disciplineId/students')
  async updateStudentsWithDiscipline(
    @Param() params,
    @Body() body,
    @Res() res: Response,
  ) {
    try {
      await this.disciplinesService.updateStudentsWithDiscipline(
        params.disciplineId,
        body,
      );

      res.status(200).json({
        status: 'success',
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Get(':disciplineId/groups')
  async getDisciplineGroups(
    @Param('disciplineId') disciplineId: string,
  ): Promise<GetDisciplineGroupsResultDto[]> {
    return this.disciplinesService.getDisciplineGroups(disciplineId);
  }
}
