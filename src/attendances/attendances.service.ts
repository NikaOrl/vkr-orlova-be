import * as R from 'ramda';
import { Injectable } from '@nestjs/common';

import { KnexService } from '../knex/knex.service';

import { StudentDisciplineDB } from '../students/students.interface';
import { AttendanceMarksDB } from './attendances.interface';
import { AttendanceMarksService } from '../attendance-marks/attendance-marks.service';

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
      .leftJoin('students', 'students-disciplines.studentId', 'students.id')
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
      .where('disciplineId', disciplineId)
      .whereIn('id', attendanceIds)
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
    disciplineId: string,
    groupId: string,
    data: any,
  ) {
    const updatedAttendances = R.map(R.pick(['id', 'attendanceName']))(data);

    const promises1 = updatedAttendances.map(async (attendanceData) => {
      return await this.updateAttendance(attendanceData.id, attendanceData);
    });

    await Promise.all(promises1);

    const updatedAttendanceMarks = R.pipe(
      R.map(R.prop('attendanceMarks')),
      R.flatten,
    )(data);

    const promises2 = updatedAttendanceMarks.map(async (attendanceMarkData) => {
      return await this.attendanceMarksService.updateAttendanceMark(
        attendanceMarkData.id,
        attendanceMarkData,
      );
    });

    await Promise.all(promises2);
  }

  async updateAttendance(id: string, data): Promise<void> {
    const knex = this.knexService.getKnex();

    await knex('attendances').where('id', id).update(data);
  }
}
