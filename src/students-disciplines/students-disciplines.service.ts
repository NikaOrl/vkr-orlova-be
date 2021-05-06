import * as R from 'ramda';
import { Injectable } from '@nestjs/common';

import { KnexService } from '../knex/knex.service';

import { StudentDisciplineDB } from './students-disciplines.interface';

@Injectable()
export class StudentsDisciplinesService {
  constructor(private readonly knexService: KnexService) {}

  async getStudentIdsByDisciplineId(disciplineId: string): Promise<string[]> {
    const knex = this.knexService.getKnex();

    const disciplineStudents = await knex<StudentDisciplineDB>(
      'students-disciplines',
    )
      .where('disciplineId', disciplineId)
      .select('*');

    return disciplineStudents.map(R.prop('studentId'));
  }
}
