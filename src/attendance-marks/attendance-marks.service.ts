import { Injectable } from '@nestjs/common';

import { KnexService } from '../knex/knex.service';

import { AttendanceMarksDB } from '../attendances/attendances.interface';

@Injectable()
export class AttendanceMarksService {
  constructor(private readonly knexService: KnexService) {}

  async updateAttendanceMark(id: string, data): Promise<void> {
    const knex = this.knexService.getKnex();

    await knex<AttendanceMarksDB>('attendance-marks')
      .where('id', id)
      .update(data);
  }
}
