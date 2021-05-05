import * as R from 'ramda';
import { Injectable } from '@nestjs/common';

import { KnexService } from '../knex/knex.service';
import { Module, ModuleDB } from './modules.interface';
import { Job, JobDB } from '../jobs/jobs.interface';
import { StudentDB, StudentDisciplineDB } from '../students/students.interface';
import { MarkDB } from '../marks/marks.interface';
import { JobsService } from '../jobs/jobs.service';

export interface IGetModulesWithJobs extends Module {
  jobs: Array<Job>;
}

@Injectable()
export class ModulesService {
  constructor(
    private readonly knexService: KnexService,
    private readonly jobsService: JobsService,
  ) {}

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

  async updateModulesWithJobs(
    disciplineId: string,
    groupId: string,
    data: any,
  ): Promise<any> {
    const updatedModules = R.map(R.omit(['jobs']))(data);

    await Promise.all(
      updatedModules.map(async (moduleData) => {
        return await this.updateModule(moduleData.id, moduleData);
      }),
    );

    const updatedJobs = R.pipe(R.map(R.prop('jobs')), R.flatten)(data);

    await Promise.all(
      updatedJobs.map(async (jobData) => {
        return await this.jobsService.updateJob(jobData);
      }),
    );
  }

  async updateModule(id: string, data): Promise<void> {
    const knex = this.knexService.getKnex();

    await knex('modules').where('id', id).update(data);
  }
}
