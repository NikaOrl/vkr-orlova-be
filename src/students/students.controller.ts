import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { StudentsService } from './students.service';

import { CreateStudentDto } from './create-student.dto';
import { UpdateStudentsDto } from './update-students.dto';

@Controller('students')
export class StudentsController {
  constructor(private studentService: StudentsService) {}

  @Get(':groupId')
  async getStudentsByGroup(@Param() params) {
    return await this.studentService.getStudentsByGroup(params.groupId);
  }

  @Post()
  async addStudent(@Body() studentData: CreateStudentDto) {
    return await this.studentService.addStudent(studentData);
  }

  @Put()
  async updateStudents(
    @Body() students: Array<UpdateStudentsDto>,
    @Res() res: Response,
  ) {
    try {
      const promises = students.map(async (studentData) => {
        return await this.studentService.updateStudent(
          studentData.id,
          studentData,
        );
      });

      await Promise.all(promises);

      res.status(200).json({
        status: 'success',
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Delete()
  async deleteStudents(@Query() query, @Res() res: Response) {
    try {
      const ids = JSON.parse(query.ids);

      const dbRes = await this.studentService.deleteStudents(ids);

      console.log(dbRes);
      res.status(200).json({
        status: 'success',
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
