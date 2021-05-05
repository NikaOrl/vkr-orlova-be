import * as R from 'ramda';
import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';

import { KnexService } from '../knex/knex.service';

import { MarkDB } from './marks.interface';
import { AttendanceMarksDB } from '../attendances/attendances.interface';
import { StudentDisciplineDB } from '../students/students.interface';
import { JobDB } from '../jobs/jobs.interface';
import { ModuleDB } from '../modules/modules.interface';
import { DisciplinesDB } from '../disciplines/disciplines.interface';

@Injectable()
export class MarksService {
  constructor(private readonly knexService: KnexService) {}

  async getMarks(disciplineId: string, groupId: string): Promise<any> {
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

    const studentAttendanceMarks = await knex<AttendanceMarksDB>(
      'attendance-marks',
    )
      .select(['id', 'studentId', 'attendanceId', 'attendanceMarkValue'])
      .whereIn('studentId', studentIds)
      .andWhere('deleted', false);

    const studentAttendances = studentIds.map((studentId) => {
      const attendance = R.pipe(
        R.filter(R.propEq('studentId', studentId)),
        R.filter(R.propEq('attendanceMarkValue', 1)),
        R.length,
      )(studentAttendanceMarks);

      return {
        id: studentId,
        attendance,
      };
    });

    const marks = await knex<MarkDB>('marks')
      .select(['id', 'studentId', 'jobId', 'markValue', 'deleted'])
      .whereIn('studentId', studentIds)
      .andWhere('deleted', false);

    const jobIds = R.pipe(R.map(R.prop('jobId')), R.uniq)(marks);

    const jobs = await knex<JobDB>('jobs')
      .select([
        'id',
        'disciplineId',
        'moduleId',
        'numberInList',
        'jobValue',
        'maxPoint',
      ])
      .where('disciplineId', disciplineId)
      .whereIn('id', jobIds)
      .andWhere('deleted', false);

    const moduleIds = R.pipe(R.map(R.prop('moduleId')), R.uniq)(jobs);

    const modules = await knex<ModuleDB>('modules')
      .select(['id', 'moduleName', 'numberInList'])
      .whereIn('id', moduleIds)
      .andWhere('deleted', false);

    const discipline = await knex<DisciplinesDB>('disciplines')
      .select(['attendanceWeight'])
      .where('id', disciplineId);

    const attendanceWeight = R.pipe(
      R.head,
      R.prop('attendanceWeight'),
    )(discipline);

    const resultJobs = jobs.map((job) => {
      const jobMarks = R.filter(R.propEq('jobId', job.id))(marks);

      return {
        ...job,
        marks: jobMarks,
      };
    });

    const resultStudents = R.map((student) => {
      const attendance = R.pipe(
        R.find(R.propEq('id', student.id)),
        R.prop('attendance'),
      )(studentAttendances);

      return {
        ...student,
        attendance,
      };
    })(students);

    const maxAttendance = R.pipe(
      R.map(R.prop('attendanceId')),
      R.uniq,
      R.length,
    )(studentAttendanceMarks);

    return {
      maxAttendance,
      attendanceWeight,
      students: resultStudents,
      modules,
      jobs: resultJobs,
    };
  }

  async createMark(mark) {
    const knex = this.knexService.getKnex();

    return knex('marks').insert({
      id: uuid(),
      ...mark,
    });
  }

  async updateMark(mark) {
    const knex = this.knexService.getKnex();

    if (mark.id === null) {
      return await knex('marks').insert(mark);
    }

    return knex('marks').where('id', mark.id).update(mark);
  }

  async deleteMarks(jobIds: Array<string>) {
    const knex = this.knexService.getKnex();

    return knex('marks').whereIn('jobId', jobIds).update('deleted', true);
  }
}
