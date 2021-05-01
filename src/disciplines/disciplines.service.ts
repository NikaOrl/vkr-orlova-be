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

  async updateDiscipline(id, data) {
    const knex = this.knexService.getKnex();

    const currentTeachers = await knex
      .from('disciplines-teachers')
      .select('teacherId')
      .where('disciplineId', id);

    const updatedTeacherIds = data.teacherIds.map(Number);
    const currentTeacherIds = currentTeachers.map(R.prop('teacherId'));

    const teacherIdsToAddToDiscipline = R.difference(
      updatedTeacherIds,
      currentTeacherIds,
    );

    const teacherIdsToRemoveFromDiscipline = R.difference(
      currentTeacherIds,
      updatedTeacherIds,
    );

    const teachersWithDisciplineIdToAdd = teacherIdsToAddToDiscipline.map(
      (teacherId) => ({
        teacherId,
        disciplineId: id,
      }),
    );

    if (!R.isEmpty(teacherIdsToAddToDiscipline)) {
      await knex('disciplines-teachers').insert(teachersWithDisciplineIdToAdd);
    }

    if (!R.isEmpty(teacherIdsToRemoveFromDiscipline)) {
      await knex('disciplines-teachers')
        .whereIn('teacherId', teacherIdsToRemoveFromDiscipline)
        .delete();
    }
  }

  async getStudentsWithDiscipline(disciplineId) {
    const knex = this.knexService.getKnex();

    const groups = await knex.from('groups').select('*');

    const students = await knex
      .from('students')
      .select(['id', 'firstName', 'lastName', 'groupId']);

    const studentWithDiscipline = await knex
      .from('students-disciplines')
      .select('studentId')
      .where('disciplineId', disciplineId);

    const studentIdsWithDiscipline = R.map(
      R.prop('studentId'),
      studentWithDiscipline,
    );

    const getGroupNumber = (groupId) => {
      return R.pipe(
        R.find(R.propEq('id', groupId)),
        R.prop('groupNumber'),
      )(groups);
    };

    const isStudentInDiscipline = R.contains(R.__, studentIdsWithDiscipline);

    const groupsWithStudents = R.pipe(
      R.groupBy(R.prop('groupId')),
      R.toPairs,
      R.map(([stringGroupId, students]) => ({
        groupId: Number(stringGroupId),
        students,
      })),
    )(students);

    return R.map(({ groupId, students }) => {
      return {
        groupId,
        groupNumber: getGroupNumber(groupId),
        students: students.map(({ id, ...studentData }) => ({
          id,
          ...studentData,
          isInDiscipline: isStudentInDiscipline(id),
        })),
      };
    })(groupsWithStudents);
  }

  async updateStudentsWithDiscipline(disciplineId, groupsWithStudents) {
    const knex = this.knexService.getKnex();

    const currentStudentsWithDiscipline = await knex
      .from('students-disciplines')
      .select('*')
      .where('disciplineId', disciplineId);

    const currentStudentsWithDisciplineIds = R.map(R.prop('studentId'))(
      currentStudentsWithDiscipline,
    );

    const students = groupsWithStudents.reduce((acc, group) => {
      return [...acc, ...group.students];
    }, []);

    const updatedStudentsWithDisciplineIds = students.reduce((acc, student) => {
      if (student.isInDiscipline) {
        return [...acc, student.id];
      }

      return acc;
    }, []);

    const updatedStudentsWithoutDisciplineIds = students.reduce(
      (acc, student) => {
        if (!student.isInDiscipline) {
          return [...acc, student.id];
        }

        return acc;
      },
      [],
    );

    const studentIdsToAddToDiscipline = R.difference(
      updatedStudentsWithDisciplineIds,
      currentStudentsWithDisciplineIds,
    );

    const studentIdsToRemoveFromDiscipline = R.intersection(
      updatedStudentsWithoutDisciplineIds,
      currentStudentsWithDisciplineIds,
    );

    const studentsWithDisciplineIdToAdd = R.pipe(
      R.map((studentId) => ({
        studentId: studentId,
        disciplineId: Number(disciplineId),
      })),
    )(studentIdsToAddToDiscipline);

    if (!R.isEmpty(studentsWithDisciplineIdToAdd)) {
      await knex('students-disciplines').insert(studentsWithDisciplineIdToAdd);
    }

    if (!R.isEmpty(studentIdsToRemoveFromDiscipline)) {
      await knex('students-disciplines')
        .whereIn('studentId', studentIdsToRemoveFromDiscipline)
        .delete();
    }
  }
}
