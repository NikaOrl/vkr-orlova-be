import * as R from 'ramda';
import { Injectable } from '@nestjs/common';

import { KnexService } from '../knex/knex.service';
import { Module, ModuleDB } from './modules.interface';
import { Job, JobDB } from '../jobs/jobs.interface';
import { StudentDB, StudentDisciplineDB } from '../students/students.interface';
import { MarkDB } from '../marks/marks.interface';

export interface IGetModulesWithJobs extends Module {
  jobs: Array<Job>;
}

@Injectable()
export class ModulesService {
  constructor(private readonly knexService: KnexService) {}

  async getModulesWithJobs(
    disciplineId: string,
    groupId: string,
  ): Promise<IGetModulesWithJobs[]> {
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

    const marks = await knex<MarkDB>('marks')
      .whereIn('studentId', studentIds)
      .andWhere('deleted', false)
      .select(['id', 'studentId', 'jobId', 'markValue', 'deleted']);

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

    return modules.map((module) => {
      const moduleJobs = R.filter(R.propEq('moduleId', module.id))(jobs);

      return {
        ...module,
        jobs: moduleJobs,
      };
    });
  }

  // async updateModulesWithJobs(disciplineId: string): Promise<any> {
  //   const knex = this.knexService.getKnex();
  //
  // }
}
