import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { MarksService } from './marks.service';
import { UpdateMarkDto } from './dto/update-mark.dto';
import { CreateMarkDto } from './dto/create-mark.dto';
import { ResultStatus } from '../../common/types/ResultStatus';

@Controller('marks')
export class MarksController {
  constructor(private marksService: MarksService) {}

  @Get()
  async getMarks(@Query() query): Promise<any> {
    return await this.marksService.getMarks(query.disciplineId, query.groupId);
  }

  // @Post()
  // async createMark(@Body() mark: CreateMarkDto, @Res() res: Response) {
  //   try {
  //     await this.marksService.createMark(mark);
  //
  //     res.status(200).json({
  //       status: 'success',
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     throw err;
  //   }
  // }

  @Put()
  async updateMarks(@Body() jobsWithMarks: any): Promise<ResultStatus> {
    await this.marksService.updateJobsWithMarks(jobsWithMarks);

    return {
      status: 'success',
    };
  }

  // @Delete()
  // async deleteJobs(@Query() query, @Res() res: Response) {
  //   try {
  //     const ids = Array.isArray(query.ids) ? query.ids : [query.ids];
  //
  //     await this.marksService.deleteMarks(ids);
  //
  //     res.status(200).json({
  //       status: 'success',
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     throw err;
  //   }
  // }
}
