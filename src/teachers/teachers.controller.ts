import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { TeachersService } from './teachers.service';
import { PutTeachersDto } from './put-teachers.dto';
import { CreateTeacherDto } from './create-teacher.dto';

@Controller('teachers')
export class TeachersController {
  constructor(private teachersService: TeachersService) {}

  @Get()
  async getTeachers() {
    return await this.teachersService.getAll();
  }

  @Post()
  async createTeacher(@Res() res: Response, @Body() teacher: CreateTeacherDto) {
    try {
      console.log(teacher);
      const dbRes = await this.teachersService.createTeachers(teacher);

      console.log(dbRes);
      res.status(200).json({
        status: 'success',
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Put()
  async updateTeachers(
    @Body() teachers: Array<PutTeachersDto>,
    @Res() res: Response,
  ) {
    try {
      const promises = teachers.map(async (teacher) => {
        return await this.teachersService.updateTeacher(teacher.id, teacher);
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
  async deleteTeachers(@Query() query, @Res() res: Response) {
    try {
      const ids = JSON.parse(query.ids);

      const dbRes = await this.teachersService.deleteTeachers(ids);

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
