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

import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentsDto } from './dto/update-students.dto';

@Controller('students')
export class StudentsController {
  constructor(private studentService: StudentsService) {}

  @Get(':groupId')
  async getStudentsByGroup(@Param() params) {
    return await this.studentService.getStudentsByGroup(params.groupId);
  }

  @Post()
  async addStudent(
    @Body() studentData: CreateStudentDto,
    @Res() res: Response,
  ) {
    try {
      await this.studentService.addStudent(studentData);

      res.status(200).json({
        status: 'success',
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
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
      const ids = Array.isArray(query.ids) ? query.ids : [query.ids];

      await this.studentService.deleteStudents(ids);

      res.status(200).json({
        status: 'success',
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Get(':groupId/table')
  async getStudentsByGroupTable(
    @Param('groupId') groupId: string,
    @Res() res: Response,
  ): Promise<void> {
    const {
      stream,
      groupNumber,
    } = await this.studentService.getStudentsByGroupTable(groupId);

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=Students_${groupNumber}.xlsx`,
    );
    res.setHeader('Content-Length', stream.length);
    res.send(stream);
  }
}
