import * as R from 'ramda';
import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';

import { KnexService } from '../knex/knex.service';

import { AttendanceMarksDB } from '../attendances/attendances.interface';

@Injectable()
export class AttendanceMarksService {
  constructor(private readonly knexService: KnexService) {}

  async updateAttendanceMark(
    id: string,
    data: AttendanceMarksDB,
  ): Promise<void> {
    const knex = this.knexService.getKnex();

    await knex<AttendanceMarksDB>('attendance-marks')
      .where('id', id)
      .update(data);
  }

  async createAttendanceMark(
    attendanceData: AttendanceMarksDB,
  ): Promise<string> {
    const knex = this.knexService.getKnex();

    const id = uuid();

    await knex<AttendanceMarksDB>('attendance-marks').insert({
      id,
      ...attendanceData,
    });

    return id;
  }

  async deleteAttendanceMark(id: string): Promise<void> {
    const knex = this.knexService.getKnex();

    await knex<AttendanceMarksDB>('attendance-marks')
      .where('id', id)
      .update('deleted', true);
  }

  async attendanceCDU(
    attendanceData: AttendanceMarksDB,
  ): Promise<string | void> {
    if (attendanceData.deleted) {
      return await this.deleteAttendanceMark(attendanceData.id);
    }

    if (Number(attendanceData.id) < 0) {
      const newAttendanceMarkData = R.omit(['id'])(attendanceData);

      return await this.createAttendanceMark(newAttendanceMarkData);
    }

    return await this.updateAttendanceMark(attendanceData.id, attendanceData);
  }
}
