import { Body, Controller, Get, Put, Query } from '@nestjs/common';

import { AttendancesService } from './attendances.service';

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
    @Query('disciplineId') disciplineId: string,
    @Query('groupId') groupId: string,
    @Body() body: any,
  ): Promise<any> {
    return this.attendancesService.updateAttendances(
      disciplineId,
      groupId,
      body,
    );
  }
}
