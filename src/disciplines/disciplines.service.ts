import * as R from 'ramda';
import { Injectable } from '@nestjs/common';

import { KnexService } from '../knex/knex.service';

@Injectable()
export class DisciplinesService {
  constructor(private readonly knexService: KnexService) {}

  async getDisciplinesWithTeachers() {
    const knex = this.knexService.getKnex();

    const disciplines = await knex
      .from('disciplines')
      .leftJoin(
        'disciplines-teachers',
        'disciplines.id',
        'disciplines-teachers.disciplineId',
      )
      .select('*');

    const teacherIds = R.map(R.prop('teacherId'), disciplines);

    const teachers = await knex
      .from('teachers')
      .select(['firstName', 'lastName', 'id'])
      .whereIn('id', teacherIds);

    const getTeacher = (teacherId) => teachers.find(R.propEq('id', teacherId));

    return disciplines.reduce((acc, { disciplineId, teacherId, ...data }) => {
      const discipline = acc.find(R.propEq('id', disciplineId));

      const accWithoutCurrent = acc.filter(
        R.complement(R.propEq('id', disciplineId)),
      );

      const pushTeacherToDiscipline = R.evolve({
        teachers: R.append(getTeacher(teacherId)),
      });

      if (!discipline) {
        return [
          ...acc,
          {
            id: disciplineId,
            teachers: [getTeacher(teacherId)],
            ...data,
          },
        ];
      }

      return [
        ...accWithoutCurrent,
        {
          ...pushTeacherToDiscipline(discipline),
        },
      ];
    }, []);
  }
}
