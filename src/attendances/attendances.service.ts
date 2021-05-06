import * as R from 'ramda';
import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';

import { KnexService } from '../knex/knex.service';
import { AttendanceMarksService } from '../attendance-marks/attendance-marks.service';

import { StudentDB } from '../students/students.interface';
import { AttendancesDB } from './attendances.interface';
import { StudentDisciplineDB } from '../students-disciplines/students-disciplines.interface';
import { AttendanceMarksDB } from '../attendance-marks/attendanceMarks.interface';

export interface IAttendancesWithAttendancesMarks extends AttendancesDB {
  attendanceMarks: AttendanceMarksDB[];
}

@Injectable()
export class AttendancesService {
  constructor(
    private readonly knexService: KnexService,
    private readonly attendanceMarksService: AttendanceMarksService,
  ) {}

  async getAttendances(disciplineId: string, groupId: string): Promise<any> {
    const knex = this.knexService.getKnex();

    const students = await knex<StudentDisciplineDB>('students-disciplines')
      .where('disciplineId', disciplineId)
      .leftJoin<StudentDB>(
        'students',
        'students-disciplines.studentId',
        'students.id',
      )
      .select([
        'studentId as id',
        'disciplineId',
        'firstName',
        'lastName',
        'email',
        'groupId',
        'headStudent',
      ])
      .andWhere('groupId', groupId)
      .andWhere('deleted', false);

    const studentIds = R.map(R.prop('id'))(students);

    const attendanceMarks = await knex<AttendanceMarksDB>('attendance-marks')
      .select(['id', 'studentId', 'attendanceId', 'attendanceMarkValue'])
      .whereIn('studentId', studentIds)
      .andWhere('deleted', false);

    const attendanceIds = R.pipe(
      R.map(R.prop('attendanceId')),
      R.uniq,
    )(attendanceMarks);

    const attendances = await knex('attendances')
      .select(['id', 'disciplineId', 'attendanceName', 'numberInList'])
      .whereIn('id', attendanceIds)
      .andWhere('disciplineId', disciplineId)
      .andWhere('deleted', false);

    const resultAttendances = attendances.map((attendance) => {
      const resultAttendanceMarks = R.filter(
        R.propEq('attendanceId', attendance.id),
      )(attendanceMarks);

      return {
        ...attendance,
        attendanceMarks: resultAttendanceMarks,
      };
    });

    return {
      students,
      attendances: resultAttendances,
    };
  }

  async updateAttendancesWithMarks(
    attendancesWithAttendancesMarks: IAttendancesWithAttendancesMarks[],
  ): Promise<void> {
    await Promise.all(
      attendancesWithAttendancesMarks.map(
        async (attendanceWithAttendancesMarks) => {
          const attendanceData = R.omit(['attendanceMarks'])(
            attendanceWithAttendancesMarks,
          );

          const newAttendanceId = await this.attendanceCDU(attendanceData);

          const attendanceMarks = R.pipe(
            R.prop('attendanceMarks'),
            R.map((attendanceMark: AttendanceMarksDB) => {
              const attendanceId = newAttendanceId
                ? newAttendanceId
                : attendanceData.id;

              const id = newAttendanceId ? null : attendanceMark.id;

              return {
                ...attendanceMark,
                id,
                attendanceId,
                deleted: attendanceData.deleted,
              };
            }),
          )(attendanceWithAttendancesMarks);

          await Promise.all(
            attendanceMarks.map(async (attendanceMark) => {
              await this.attendanceMarksService.attendanceCDU(attendanceMark);
            }),
          );
        },
      ),
    );
  }

  async updateAttendance(id: string, data: AttendancesDB): Promise<void> {
    const knex = this.knexService.getKnex();

    await knex<AttendancesDB>('attendances').where('id', id).update(data);
  }

  async createAttendance(
    attendanceData: Omit<AttendancesDB, 'id'>,
  ): Promise<string> {
    const knex = this.knexService.getKnex();

    const id = uuid();

    await knex<AttendancesDB>('attendances').insert({
      id,
      ...attendanceData,
    });

    return id;
  }

  async deleteAttendance(id: string): Promise<void> {
    const knex = this.knexService.getKnex();

    await knex<AttendancesDB>('attendances')
      .where('id', id)
      .update('deleted', true);
  }

  async attendanceCDU(attendanceData: AttendancesDB): Promise<string | void> {
    if (attendanceData.deleted) {
      return await this.deleteAttendance(attendanceData.id);
    }

    if (!attendanceData.id || Number(attendanceData.id) < 0) {
      const newAttendanceData = R.omit(['id'])(attendanceData);

      return await this.createAttendance(newAttendanceData);
    }

    return await this.updateAttendance(attendanceData.id, attendanceData);
  }
}
