import { Controller, Get } from '@nestjs/common';

import { DisciplinesService } from './disciplines.service';

@Controller('disciplines')
export class DisciplinesController {
  constructor(private disciplinesService: DisciplinesService) {}

  @Get()
  async getDisciplinesWithTeachers() {
    return this.disciplinesService.getDisciplinesWithTeachers();
  }
}
