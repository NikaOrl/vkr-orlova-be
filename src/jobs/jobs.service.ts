import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';

import { KnexService } from '../knex/knex.service';

@Injectable()
export class JobsService {
  constructor(private readonly knexService: KnexService) {}

  async createJob(jobData) {
    const knex = this.knexService.getKnex();

    return knex('jobs').insert({
      id: uuid(),
      ...jobData,
    });
  }

  async updateJob(jobData) {
    console.log(jobData);
    const knex = this.knexService.getKnex();

    return knex('jobs').where('id', jobData.id).update(jobData);
  }

  async deleteJobs(ids: Array<string>) {
    const knex = this.knexService.getKnex();

    return knex('jobs').whereIn('id', ids).update('deleted', true);
  }
}
