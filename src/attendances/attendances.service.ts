import * as R from 'ramda';
import { Injectable } from '@nestjs/common';

import { KnexService } from '../knex/knex.service';

import { StudentDisciplineDB } from '../students/students.interface';
import { AttendanceMarksDB } from './attendances.interface';

@Injectable()
export class AttendancesService {
  constructor(private readonly knexService: KnexService) {}

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

  async updateAttendances(disciplineId: string, groupId: string, body: any) {

    return
  }
}
