import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { KnexService } from '../knex/knex.service';
import { SemesterDB } from './semesters.interface';

@Injectable()
export class SemestersService {
  constructor(private readonly knexService: KnexService) {}

  async getSemesters(): Promise<SemesterDB[]> {
    const knex = this.knexService.getKnex();

    return knex<SemesterDB>('semesters').where('deleted', false).select('*');
  }

  async createSemester(semesterData: Omit<SemesterDB, 'id'>): Promise<string> {
    const knex = this.knexService.getKnex();

    const id = uuid();

    await knex<SemesterDB>('semesters').insert({
      id,
      ...semesterData,
    });

    return id;
  }
}
