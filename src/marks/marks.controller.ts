import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('marks')
export class MarksController {
  @Get(':disciplineId')
  getMarks(@Param() params): string {
    return `MARKS. disciplineId: ${params.disciplineId}`;
  }

  @Post()
  addMarks(): string {
    return 'Add marks';
  }

  @Put()
  updateMarks(): string {
    return 'update marks';
  }

  // Remove???
  @Delete()
  deleteMarks(): string {
    return 'delete marks';
  }
}
