import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { StudentsService } from './students.service';

import { ResultStatus } from '../../common/types/ResultStatus';
import { CreateStudentsDto } from './dto/create-students.dto';
import { UpdateStudentsDto } from './dto/update-students.dto';
import { GetStudentsByGroupResultDto } from './dto/get-students-by-group-result.dto';

@Controller('students')
export class StudentsController {
  constructor(private studentService: StudentsService) {}

  @Get(':groupId')
  async getStudentsByGroup(
    @Param('groupId') groupId: string,
  ): Promise<GetStudentsByGroupResultDto> {
    return await this.studentService.getStudentsByGroup(groupId);
  }

  @Post()
  async addStudents(
    @Body() createStudentsDto: CreateStudentsDto,
  ): Promise<ResultStatus> {
    await this.studentService.createStudents(createStudentsDto);

    return {
      status: 'success',
    };
  }

  @Put()
  async updateStudents(
    @Body() students: UpdateStudentsDto,
  ): Promise<ResultStatus> {
    const promises = students.map(async (studentData) => {
      return await this.studentService.updateStudent(
        studentData.id,
        studentData,
      );
    });

    await Promise.all(promises);

    return {
      status: 'success',
    };
  }

  @Delete()
  async deleteStudents(
    @Query('ids') ids: string | string[],
  ): Promise<ResultStatus> {
    const studentIds = Array.isArray(ids) ? ids : [ids];

    await this.studentService.deleteStudents(studentIds);

    return {
      status: 'success',
    };
  }
}
