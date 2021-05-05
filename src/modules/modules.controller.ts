import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { ModulesService } from './modules.service';

@Controller('modules')
export class ModulesController {
  constructor(private modulesService: ModulesService) {}

  @Get('/jobs')
  async getModulesWithJobs(
    @Query('disciplineId') disciplineId: string,
    @Query('groupId') groupId: string,
  ): Promise<any> {
    return this.modulesService.getModulesWithJobs(disciplineId, groupId);
  }

  @Put('/jobs')
  async updateModulesWithJobs(
    @Query('disciplineId') disciplineId: string,
    @Query('groupId') groupId: string,
    @Body() modulesWithJobs: any,
  ): Promise<any> {
    await this.modulesService.updateModulesWithJobs(
      disciplineId,
      groupId,
      modulesWithJobs,
    );

    return {
      status: 'success',
    };
  }
}
