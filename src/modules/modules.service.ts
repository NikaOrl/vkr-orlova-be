import * as R from 'ramda';
import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';

import { KnexService } from '../knex/knex.service';
import { JobsService } from '../jobs/jobs.service';

import { Module, ModuleDB } from './modules.interface';
import { Job, JobDB } from '../jobs/jobs.interface';
import { StudentDB, StudentDisciplineDB } from '../students/students.interface';
import { MarkDB } from '../marks/marks.interface';

export interface IGetModulesWithJobs extends Module {
  jobs: Array<Job>;
}

export interface IUpdateModulesWithJobs extends ModuleDB {
  jobs: JobDB[];
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
    modulesWithJobs: IUpdateModulesWithJobs[],
  ): Promise<void> {
    await Promise.all(
      modulesWithJobs.map(async (moduleWithJobs) => {
        const moduleData = R.omit(['jobs'])(moduleWithJobs);

        const newModuleId = await this.moduleCDU(moduleData);

        const jobs = R.pipe(
          R.prop('jobs'),
          R.map((job: JobDB) => {
            const moduleId = newModuleId ? newModuleId : moduleData.id;

            return {
              ...job,
              moduleId,
              deleted: moduleData.deleted,
            };
          }),
        )(moduleWithJobs);

        await Promise.all(
          jobs.map(async (job) => {
            await this.jobsService.jobCDU(job);
          }),
        );
      }),
    );
  }

  async updateModule(id: string, moduleData: ModuleDB): Promise<void> {
    const knex = this.knexService.getKnex();

    await knex<ModuleDB>('modules').where('id', id).update(moduleData);
  }

  async createModule(moduleData: Omit<ModuleDB, 'id'>): Promise<string> {
    const knex = this.knexService.getKnex();

    const id = uuid();

    await knex<ModuleDB>('modules').insert({
      id,
      ...moduleData,
    });

    return id;
  }

  async deleteModule(id: string): Promise<void> {
    const knex = this.knexService.getKnex();

    await knex<ModuleDB>('modules').where('id', id).update('deleted', true);
  }

  async moduleCDU(moduleData: ModuleDB): Promise<string | void> {
    if (moduleData.deleted) {
      return await this.deleteModule(moduleData.id);
    }

    if (!moduleData.id || Number(moduleData.id) < 0) {
      const newModuleData = R.omit(['id'])(moduleData);

      return await this.createModule(newModuleData);
    }

    return await this.updateModule(moduleData.id, moduleData);
  }
}
