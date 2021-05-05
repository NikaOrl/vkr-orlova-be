import { Body, Controller, Get, Put, Query } from '@nestjs/common';

import { ModulesService } from './modules.service';

import { ResultStatus } from '../../common/types/ResultStatus';
import { UpdateModulesWithJobsDto } from './dto/update-modules-with-jobs.dto';

@Controller('modules')
export class ModulesController {
  constructor(private modulesService: ModulesService) {}

  @Get('')
  async getModulesWithJobs(
    @Query('disciplineId') disciplineId: string,
    @Query('groupId') groupId: string,
  ): Promise<any> {
    return this.modulesService.getModulesWithJobs(disciplineId, groupId);
  }

  @Put('')
  async updateModulesWithJobs(
    @Body() modulesWithJobs: UpdateModulesWithJobsDto[],
  ): Promise<ResultStatus> {
    await this.modulesService.updateModulesWithJobs(modulesWithJobs);

    return {
      status: 'success',
    };
  }
}
