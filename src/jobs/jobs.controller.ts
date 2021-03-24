import { Controller, Delete, Post, Put } from '@nestjs/common';

@Controller('jobs')
export class JobsController {
  @Post()
  addJobs(): string {
    return 'Add jobs';
  }

  @Put()
  updateJobs(): string {
    return 'update jobs';
  }

  @Delete()
  deleteJobs(): string {
    return 'delete jobs';
  }
}
