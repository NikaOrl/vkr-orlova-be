import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { ModulesService } from './modules.service';

@Controller('modules')
export class ModulesController {
  constructor(private modulesService: ModulesService) {}

  @Get('/jobs')
  async getModulesWithJobs(
    @Query('disciplineId') disciplineId: string,
  ): Promise<any> {
    return this.modulesService.getModulesWithJobs(disciplineId);
  }

  @Put('/jobs')
  async updateModulesWithJobs(
    @Query('disciplineId') disciplineId: string,
    // @Body() body,
  ): Promise<any> {
    return this.modulesService.getModulesWithJobs(disciplineId);
  }
}
