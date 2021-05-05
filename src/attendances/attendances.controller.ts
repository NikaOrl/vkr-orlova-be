import { Body, Controller, Get, Put, Query } from '@nestjs/common';

import { AttendancesService } from './attendances.service';

import { ResultStatus } from '../../common/types/ResultStatus';
import { UpdateAttendancesWithAttendancesMarksDto } from './dto/update-attendances-with-attendances-marks.dto';

@Controller('attendances')
export class AttendancesController {
  constructor(private attendancesService: AttendancesService) {}

  @Get()
  async getAttendances(
    @Query('disciplineId') disciplineId: string,
    @Query('groupId') groupId: string,
  ): Promise<any> {
    return this.attendancesService.getAttendances(disciplineId, groupId);
  }

  @Put()
  async updateAttendances(
    @Body()
    attendancesWithAttendancesMarks: UpdateAttendancesWithAttendancesMarksDto[],
  ): Promise<ResultStatus> {
    await this.attendancesService.updateAttendancesWithMarks(
      attendancesWithAttendancesMarks,
    );

    return {
      status: 'success',
    };
  }
}
