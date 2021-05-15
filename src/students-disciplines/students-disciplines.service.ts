import * as R from 'ramda';
import { v4 as uuid } from 'uuid';
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

  async addStudentsWithDiscipline(
    studentsWithDisciplineId: Omit<StudentDisciplineDB, 'id'>,
  ): Promise<void> {
    const knex = this.knexService.getKnex();

    const studentsWithDisciplineIdToAdd = R.map((data) => ({
      id: uuid(),
      ...data,
    }))(studentsWithDisciplineId);

    await knex<StudentDisciplineDB>('students-disciplines').insert(
      studentsWithDisciplineIdToAdd,
    );
  }

  async deleteStudentsWithDiscipline(
    disciplineId: string,
    studentsIds: string[],
  ): Promise<void> {
    const knex = this.knexService.getKnex();

    await knex('students-disciplines')
      .where('disciplineId', disciplineId)
      .whereIn('studentId', studentsIds)
      .delete();
  }
}
