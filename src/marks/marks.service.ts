import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';

import { KnexService } from '../knex/knex.service';

@Injectable()
export class MarksService {
  constructor(private readonly knexService: KnexService) {}

  async getMarks(disciplineId, groupId) {
    const knex = this.knexService.getKnex();

    const studentsDisciplines = await knex
      .from('students-disciplines')
      .select('studentId')
      .where('disciplineId', disciplineId);

    const studentsIds = studentsDisciplines.map((st) => st.studentId);

    const students = await knex
      .from('students')
      .select('*')
      .whereIn('id', studentsIds)
      .andWhere('groupId', groupId)
      .andWhere('deleted', false);

    const jobs = await knex
      .from('jobs')
      .select('*')
      .where('disciplineId', disciplineId)
      .andWhere('deleted', false);

    const jodsIds = jobs.map((job) => job.id);

    const marks = await knex
      .from('marks')
      .select('*')
      .whereIn('jobId', jodsIds)
      .whereIn('studentId', studentsIds)
      .andWhere('deleted', false);

    return {
      students,
      jobs,
      marks,
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
