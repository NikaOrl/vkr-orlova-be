import { Body, Controller, Get, Post } from '@nestjs/common';

import { SemestersService } from './semesters.service';

import { ResultStatus } from '../../common/types/ResultStatus';
import { GetSemestersResultDto } from './dto/get-semesters-result.dto';
import { CreateSemesterDto } from './dto/create-semester.dto';

@Controller('semesters')
export class SemestersController {
  constructor(private readonly semestersService: SemestersService) {}

  @Get()
  async getSemesters(): Promise<GetSemestersResultDto> {
    return this.semestersService.getSemesters();
  }

  @Post()
  async createSemesters(
    @Body() createSemesterDto: CreateSemesterDto,
  ): Promise<ResultStatus> {
    await this.semestersService.createSemester(createSemesterDto);

    return {
      status: 'success',
    };
  }
}
