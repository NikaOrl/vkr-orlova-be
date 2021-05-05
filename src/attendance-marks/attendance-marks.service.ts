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
    attendanceMarkData: Omit<AttendanceMarksDB, 'id'>,
  ): Promise<string> {
    const knex = this.knexService.getKnex();

    const id = uuid();

    await knex<AttendanceMarksDB>('attendance-marks').insert({
      id,
      ...attendanceMarkData,
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
    attendanceMarkData: AttendanceMarksDB,
  ): Promise<string | void> {
    if (attendanceMarkData.deleted) {
      return await this.deleteAttendanceMark(attendanceMarkData.id);
    }

    if (!attendanceMarkData.id || Number(attendanceMarkData.id) < 0) {
      const newAttendanceMarkData = R.omit(['id'])(attendanceMarkData);

      return await this.createAttendanceMark(newAttendanceMarkData);
    }

    return await this.updateAttendanceMark(
      attendanceMarkData.id,
      attendanceMarkData,
    );
  }
}
