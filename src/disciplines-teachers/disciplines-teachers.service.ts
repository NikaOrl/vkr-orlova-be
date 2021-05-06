import * as R from 'ramda';
import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';

import { KnexService } from '../knex/knex.service';

import { DisciplineTeacherDB } from './disciplines-teachers.interface';

@Injectable()
export class DisciplinesTeachersService {
  constructor(private readonly knexService: KnexService) {}

  async getDisciplineTeacherIds(disciplineId: string): Promise<string[]> {
    const knex = this.knexService.getKnex();

    const currentTeachers = await knex<DisciplineTeacherDB>(
      'disciplines-teachers',
    )
      .select('teacherId')
      .where('disciplineId', disciplineId);

    return currentTeachers.map(R.prop('teacherId'));
  }

  async addDisciplineTeachers(
    teachersWithDisciplineId: Omit<DisciplineTeacherDB, 'id'>[],
  ): Promise<void> {
    const knex = this.knexService.getKnex();

    const teachersWithDisciplineIdToAdd = teachersWithDisciplineId.map(
      (teacherWithDisciplineId) => ({
        id: uuid(),
        ...teacherWithDisciplineId,
      }),
    );

    await knex<DisciplineTeacherDB>('disciplines-teachers').insert(
      teachersWithDisciplineIdToAdd,
    );
  }

  async deleteDisciplineTeachers(
    disciplineId: string,
    teacherIds: string[],
  ): Promise<void> {
    const knex = this.knexService.getKnex();

    await knex<DisciplineTeacherDB>('disciplines-teachers')
      .where('disciplineId', disciplineId)
      .whereIn('teacherId', teacherIds)
      .delete();
  }

  async deleteAllDisciplineTeachers(disciplineId: string): Promise<void> {
    const knex = this.knexService.getKnex();

    await knex<DisciplineTeacherDB>('disciplines-teachers')
      .where('disciplineId', disciplineId)
      .delete();
  }
}
