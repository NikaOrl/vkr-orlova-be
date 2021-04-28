import { Controller, Get, Param } from '@nestjs/common';

import { DisciplinesService } from './disciplines.service';

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
}
