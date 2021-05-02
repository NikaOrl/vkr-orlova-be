import * as R from 'ramda';
import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';

import { KnexService } from '../knex/knex.service';

@Injectable()
export class MarksService {
  constructor(private readonly knexService: KnexService) {}

  async getMarks(disciplineId: string, groupId: string): Promise<any> {
    const knex = this.knexService.getKnex();

    const students = await knex
      .from('students-disciplines')
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

    const studentIds = students.map(R.prop('id'));

    const jobs = await knex
      .from('jobs')
      .select([
        'id',
        'disciplineId',
        'moduleId',
        'numberInList',
        'jobValue',
        'maxPoint',
      ])
      .where('disciplineId', disciplineId)
      .andWhere('deleted', false);

    const jobIds = jobs.map(R.prop('id'));

    const moduleIds = R.pipe(R.map(R.prop('moduleId')), R.uniq)(jobs);

    const modules = await knex
      .from('modules')
      .select(['id', 'moduleName', 'numberInList'])
      .whereIn('id', moduleIds)
      .andWhere('deleted', false);

    const marks = await knex
      .from('marks')
      .select(['id', 'studentId', 'jobId', 'markValue', 'deleted'])
      .whereIn('jobId', jobIds)
      .whereIn('studentId', studentIds)
      .andWhere('deleted', false);

    const resultJobs = jobs.map((job) => {
      const jobMarks = R.filter(R.propEq('jobId', job.id))(marks);

      return {
        ...job,
        marks: jobMarks,
      };
    });

    return {
      students,
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
