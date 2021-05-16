import * as R from 'ramda';
import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';

import { KnexService } from '../knex/knex.service';
import { JobsService } from '../jobs/jobs.service';
import { DisciplinesService } from '../disciplines/disciplines.service';

import { MarkDB } from './marks.interface';
import { JobDB } from '../jobs/jobs.interface';
import { ModuleDB } from '../modules/modules.interface';
import { StudentDisciplineDB } from '../students-disciplines/students-disciplines.interface';
import { AttendanceMarksDB } from '../attendance-marks/attendanceMarks.interface';
import { GenerateTableService } from '../generate-table/generate-table.service';
import { orderedByModuleJobs, parseGetMarksResult } from "./marks.helper";

export interface IJobsWithMarks extends JobDB {
  marks: MarkDB[];
}

const TableColumns = {
  STUDENT_NAME: 'studentName',
  ATTENDANCE: 'attendance',
  ATTENDANCE_POINTS: 'attendancePoints',
  SUM_POINTS: 'sumPoints',
  RESULT_CELL_MARK: 'resultCellMark',
};

@Injectable()
export class MarksService {
  constructor(
    private readonly knexService: KnexService,
    private readonly jobsService: JobsService,
    private readonly disciplinesService: DisciplinesService,
    private readonly generateTableService: GenerateTableService,
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

    const discipline = await this.disciplinesService.getDiscipline(
      disciplineId,
    );

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

    const {
      attendanceWeight,
      countWithAttendance,
      countAsAverage,
      three,
      four,
      five,
    } = discipline;

    return {
      maxAttendance,
      attendanceWeight,
      countWithAttendance,
      countAsAverage,
      marksAreas: {
        five,
        four,
        three,
      },
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

  async getMarksExcelTable(
    disciplineId: string,
    groupId: string,
  ): Promise<any> {
    const data = await this.getMarks(disciplineId, groupId);

    const getModuleName = (moduleId) =>
      R.pipe(
        R.find(R.propEq('id', moduleId)),
        R.prop('moduleName'),
      )(data.modules);

    const jobsColumns = data.jobs.map((job) => ({
      key: job.id,
      width: 10,
    }));

    const jobsHeaders = data.jobs.reduce(
      (acc, job) => ({
        ...acc,
        [job.id]: job.jobValue,
      }),
      {},
    );

    const columnsBase = [
      { key: TableColumns.STUDENT_NAME, width: 35 },
      ...jobsColumns,
      { key: TableColumns.ATTENDANCE, width: 10 },
      { key: TableColumns.ATTENDANCE_POINTS, width: 10 },
      { key: TableColumns.SUM_POINTS, width: 10 },
      { key: TableColumns.RESULT_CELL_MARK, width: 10 },
    ];

    const firstRow = data.jobs.reduce((acc, job) => {
      return {
        ...acc,
        [job.id]: getModuleName(job.moduleId),
      };
    }, {});

    const secondRow = {
      [TableColumns.STUDENT_NAME]: 'Студент',
      [TableColumns.ATTENDANCE]: 'Посещаемость',
      [TableColumns.ATTENDANCE_POINTS]: 'Баллы за посещаемость',
      [TableColumns.SUM_POINTS]: 'Итоговый балл',
      [TableColumns.RESULT_CELL_MARK]: 'Итоговая оценка',
      ...jobsHeaders,
    };

    const attendanceWeight = data.attendanceWeight;
    const countWithAttendance = data.countWithAttendance;
    const countAsAverage = data.countAsAverage;
    const marksAreas = data.marksAreas;

    const jobs = data.jobs.sort((j1, j2) =>
      j1.moduleId === j2.moduleId ? j1.numberInList - j2.numberInList : 0,
    );

    const modules = data.modules.sort(
      (m1, m2) => m1.numberInList - m2.numberInList,
    );

    const { orderedJobs, orderedModules } = orderedByModuleJobs(modules, jobs);

    const rows = parseGetMarksResult({
      students: data.students,
      jobs: orderedJobs,
      modules: orderedModules,
      attendanceWeight,
      countAsAverage,
      countWithAttendance,
      marksAreas,
    });

    let START_COLUMN = 2;
    const ROW = 1;

    const mergeCells = orderedModules.map(({ numberOfJobs }): [
      number,
      number,
      number,
      number,
    ] => {
      const endColumn = START_COLUMN + numberOfJobs - 1;

      const merge: [number, number, number, number] = [
        ROW,
        START_COLUMN,
        ROW,
        endColumn,
      ];

      START_COLUMN = endColumn + 1;

      return merge;
    });

    const columns = R.ifElse(
      R.always(!countWithAttendance),
      R.filter(R.complement(R.propEq('key', TableColumns.ATTENDANCE_POINTS))),
      R.always,
    )(columnsBase);

    return await this.generateTableService.createCustomExcel(
      columns,
      [firstRow, secondRow, ...rows],
      mergeCells,
    );
  }
}
