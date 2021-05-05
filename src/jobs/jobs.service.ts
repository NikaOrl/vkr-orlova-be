import * as R from 'ramda';
import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';

import { KnexService } from '../knex/knex.service';

import { JobDB } from './jobs.interface';

@Injectable()
export class JobsService {
  constructor(private readonly knexService: KnexService) {}

  async updateJob(id: string, jobData: JobDB): Promise<void> {
    const knex = this.knexService.getKnex();

    await knex<JobDB>('jobs').where('id', id).update(jobData);
  }

  async createJob(jobData: Omit<JobDB, 'id'>): Promise<string> {
    const knex = this.knexService.getKnex();

    const id = uuid();

    await knex<JobDB>('jobs').insert({
      id,
      ...jobData,
    });

    return id;
  }

  async deleteJob(id: string): Promise<void> {
    const knex = this.knexService.getKnex();

    await knex<JobDB>('jobs').where('id', id).update('deleted', true);
  }

  async jobCDU(jobData: JobDB): Promise<string | void> {
    if (jobData.deleted) {
      return await this.deleteJob(jobData.id);
    }

    if (!jobData.id || Number(jobData.id) < 0) {
      const newJobData = R.omit(['id'])(jobData);

      return await this.createJob(newJobData);
    }

    return await this.updateJob(jobData.id, jobData);
  }
}
