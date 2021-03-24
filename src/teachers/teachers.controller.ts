import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('teachers')
export class TeachersController {
  @Get()
  getTeachers(): string {
    return `Teachers`;
  }

  @Post()
  addTeachers(): string {
    return 'Add students';
  }

  @Put()
  updateTeachers(): string {
    return 'update students';
  }

  @Delete()
  deleteTeachers(): string {
    return 'delete students';
  }
}
