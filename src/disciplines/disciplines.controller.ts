import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { DisciplinesService } from './disciplines.service';

import { ResultStatus } from '../../common/types/ResultStatus';

import { UpdateDisciplineWithTeachersDto } from './dto/update-discipline-with-teachers.dto';
import { CreateDisciplineWithTeachersDto } from './dto/create-discipline-with-teachers.dto';
import { GetDisciplineGroupsResultDto } from './dto/get-discipline-groups-result.dto';
import { GetDisciplinesWithTeachersResultDto } from './dto/get-disciplines-with-teachers-result.dto';
import { UpdateStudentsWithDisciplineDto } from './dto/update-students-with-discipline.dto';
import { GetStudentsWithDisciplineResultDto } from './dto/get-students-with-discipline-result.dto';

@Controller('disciplines')
export class DisciplinesController {
  constructor(private disciplinesService: DisciplinesService) {}

  @Get(':semesterId')
  async getDisciplinesWithTeachers(
    @Param('semesterId') semesterId: string,
  ): Promise<GetDisciplinesWithTeachersResultDto> {
    return this.disciplinesService.getDisciplinesWithTeachers(semesterId);
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
  async getStudentsWithDiscipline(
    @Param('disciplineId') disciplineId: string,
  ): Promise<GetStudentsWithDisciplineResultDto> {
    return this.disciplinesService.getStudentsWithDiscipline(disciplineId);
  }

  @Put(':disciplineId/students')
  async updateStudentsWithDiscipline(
    @Param('disciplineId') disciplineId: string,
    @Body() updateStudentsWithDisciplineDto: UpdateStudentsWithDisciplineDto,
  ): Promise<ResultStatus> {
    await this.disciplinesService.updateStudentsWithDiscipline(
      disciplineId,
      updateStudentsWithDisciplineDto,
    );

    return {
      status: 'success',
    };
  }

  @Get(':disciplineId/groups')
  async getDisciplineGroups(
    @Param('disciplineId') disciplineId: string,
  ): Promise<GetDisciplineGroupsResultDto[]> {
    return this.disciplinesService.getDisciplineGroups(disciplineId);
  }
}
