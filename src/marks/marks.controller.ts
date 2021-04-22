import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';

import { MarksService } from './marks.service';
import { UpdateMarkDto } from './update-mark.dto';
import { CreateMarkDto } from './create-mark.dto';

@Controller('marks')
export class MarksController {
  constructor(private marksService: MarksService) {}

  @Get(':disciplineId')
  async getMarks(@Param() params) {
    return await this.marksService.getMarks(params.disciplineId);
  }

  @Post()
  async createMark(@Body() mark: CreateMarkDto, @Res() res: Response) {
    try {
      await this.marksService.createMark(mark);

      res.status(200).json({
        status: 'success',
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Put()
  async updateMarks(@Body() marks: Array<UpdateMarkDto>, @Res() res: Response) {
    try {
      const promises = marks.map(async (mark) => {
        return await this.marksService.updateMark(mark);
      });

      await Promise.all(promises);

      res.status(200).json({
        status: 'success',
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
