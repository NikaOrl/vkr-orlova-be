import * as R from 'ramda';
import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';

import { KnexService } from '../knex/knex.service';
import { JobsService } from '../jobs/jobs.service';

import { MarkDB } from './marks.interface';
import { AttendanceMarksDB } from '../attendances/attendances.interface';
import { StudentDisciplineDB } from '../students/students.interface';
import { JobDB } from '../jobs/jobs.interface';
import { ModuleDB } from '../modules/modules.interface';
import { DisciplinesDB } from '../disciplines/disciplines.interface';

export interface IJobsWithMarks extends JobDB {
  marks: MarkDB[];
}

@Injectable()
export class MarksService {
  constructor(
    private readonly knexService: KnexService,
    private readonly jobsService: JobsService,
  ) {}

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

    const [discipline] = await knex<DisciplinesDB>('disciplines')
      .select(['attendanceWeight', 'countWithAttendance'])
      .where('id', disciplineId);

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

    const { attendanceWeight, countWithAttendance } = discipline;

    return {
      maxAttendance,
      attendanceWeight,
      countWithAttendance,
      students: resultStudents,
      modules,
      jobs: resultJobs,
    };
  }

  async updateJobsWithMarks(jobsWithMarks: IJobsWithMarks[]): Promise<void> {
    await Promise.all(
      jobsWithMarks.map(async (jobWithMarks) => {
        const jobData = R.omit(['marks'])(jobWithMarks);

        const newJobId = await this.jobsService.jobCDU(jobData);

        const marks = R.pipe(
          R.prop('marks'),
          R.map((mark: MarkDB) => {
            const jobId = newJobId ? newJobId : jobData.id;

            const id = newJobId ? null : mark.id;

            return {
              ...mark,
              id,
              jobId,
              deleted: jobData.deleted,
            };
          }),
        )(jobWithMarks);

        await Promise.all(
          marks.map(async (mark) => {
            await this.markCDU(mark);
          }),
        );
      }),
    );
  }

  async updateMark(id: string, markData: MarkDB): Promise<void> {
    const knex = this.knexService.getKnex();

    await knex<MarkDB>('marks').where('id', id).update(markData);
  }

  async createMark(markData: Omit<MarkDB, 'id'>): Promise<string> {
    const knex = this.knexService.getKnex();

    const id = uuid();

    await knex<MarkDB>('marks').insert({
      id,
      ...markData,
    });

    return id;
  }

  async deleteMark(id: string): Promise<void> {
    const knex = this.knexService.getKnex();

    await knex<MarkDB>('marks').where('id', id).update('deleted', true);
  }

  async markCDU(markData: MarkDB): Promise<string | void> {
    if (markData.deleted) {
      return await this.deleteMark(markData.id);
    }

    if (!markData.id || Number(markData.id) < 0) {
      const newMarkData = R.omit(['id'])(markData);

      return await this.createMark(newMarkData);
    }

    return await this.updateMark(markData.id, markData);
  }
}
