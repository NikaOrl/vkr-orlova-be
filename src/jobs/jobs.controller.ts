import { Response } from 'express';
import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';

import { JobsService } from './jobs.service';
import { CreateJobDto } from './create-job.dto';
import { UpdateJobDto } from './update-job.dto';

@Controller('jobs')
export class JobsController {
  // constructor(private jobsService: JobsService) {}
  //
  // @Post()
  // async createJob(@Res() res: Response, @Body() job: CreateJobDto) {
  //   try {
  //     await this.jobsService.createJob(job);
  //
  //     res.status(200).json({
  //       status: 'success',
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     throw err;
  //   }
  // }
  //
  // @Put()
  // async updateJobs(@Body() jobs: Array<UpdateJobDto>, @Res() res: Response) {
  //   try {
  //     const promises = jobs.map(async (job) => {
  //       return await this.jobsService.updateJob(job);
  //     });
  //
  //     await Promise.all(promises);
  //
  //     res.status(200).json({
  //       status: 'success',
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     throw err;
  //   }
  // }
  //
  // @Delete()
  // async deleteJobs(@Query() query, @Res() res: Response) {
  //   try {
  //     const ids = Array.isArray(query.ids) ? query.ids : [query.ids];
  //
  //     await this.jobsService.deleteJobs(ids);
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
