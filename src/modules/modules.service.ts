import * as R from 'ramda';
import { Injectable } from '@nestjs/common';

import { KnexService } from '../knex/knex.service';

@Injectable()
export class ModulesService {
  constructor(private readonly knexService: KnexService) {}

  async getModulesWithJobs(disciplineId: string): Promise<any> {
    const knex = this.knexService.getKnex();

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

    const moduleIds = R.pipe(R.map(R.prop('moduleId')), R.uniq)(jobs);

    const modules = await knex
      .from('modules')
      .select(['id', 'moduleName', 'numberInList'])
      .whereIn('id', moduleIds)
      .andWhere('deleted', false);

    return modules.map((module) => {
      const moduleJobs = R.filter(R.propEq('id', module.id))(jobs);

      return {
        ...module,
        jobs: moduleJobs,
      };
    });
  }

  async updateModulesWithJobs(disciplineId: string): Promise<any> {
    const knex = this.knexService.getKnex();

  }
}
