import { Body, Controller, Get, Put, Query } from '@nestjs/common';

import { MarksService } from './marks.service';

import { ResultStatus } from '../../common/types/ResultStatus';
import { UpdateJobsWithMarksDto } from './dto/update-jobs-with-marks.dto';

@Controller('marks')
export class MarksController {
  constructor(private marksService: MarksService) {}

  @Get()
  async getMarks(@Query() query): Promise<any> {
    return await this.marksService.getMarks(query.disciplineId, query.groupId);
  }

  @Put()
  async updateJobsWithMarks(
    @Body() jobsWithMarks: UpdateJobsWithMarksDto[],
  ): Promise<ResultStatus> {
    await this.marksService.updateJobsWithMarks(jobsWithMarks);

    return {
      status: 'success',
    };
  }
}
