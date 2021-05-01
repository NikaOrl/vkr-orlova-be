import { Body, Controller, Get, Param, Put, Res } from '@nestjs/common';

import { DisciplinesService } from './disciplines.service';
import { Response } from 'express';

@Controller('disciplines')
export class DisciplinesController {
  constructor(private disciplinesService: DisciplinesService) {}

  @Get()
  async getDisciplinesWithTeachers() {
    return this.disciplinesService.getDisciplinesWithTeachers();
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
}
