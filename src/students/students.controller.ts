import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('students')
export class StudentsController {
  @Get(':groupId')
  getStudents(@Param() params): string {
    return `Students. groupId: ${params.groupId}`;
  }

  @Post()
  addStudents(): string {
    return 'Add students';
  }

  @Put()
  updateStudents(): string {
    return 'update students';
  }

  @Delete()
  deleteStudents(): string {
    return 'delete students';
  }
}
