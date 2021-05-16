import { Body, Controller, Get, Put, Query, Res } from '@nestjs/common';

import { MarksService } from './marks.service';

import { ResultStatus } from '../../common/types/ResultStatus';
import { UpdateJobsWithMarksDto } from './dto/update-jobs-with-marks.dto';
import { Response } from 'express';

@Controller('marks')
export class MarksController {
  constructor(private marksService: MarksService) {}

  @Get()
  async getMarks(
    @Query('disciplineId') disciplineId: string,
    @Query('disciplineId') groupId: string,
  ): Promise<any> {
    return await this.marksService.getMarks(disciplineId, groupId);
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

  @Get('/table')
  async getMarksExcelTable(
    @Query('disciplineId') disciplineId: string,
    @Query('disciplineId') groupId: string,
    @Res() res: Response,
  ): Promise<any> {
    const stream = await this.marksService.getMarksExcelTable(
      disciplineId,
      groupId,
    );

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', `attachment; filename=test.xlsx`);
    res.setHeader('Content-Length', stream.length);
    res.send(stream);
  }
}
