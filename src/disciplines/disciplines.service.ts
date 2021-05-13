import * as R from 'ramda';
import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';

import { KnexService } from '../knex/knex.service';
import { DisciplinesTeachersService } from '../disciplines-teachers/disciplines-teachers.service';
import { StudentsDisciplinesService } from '../students-disciplines/students-disciplines.service';
import { StudentsService } from '../students/students.service';

import { GroupDB } from '../groups/groups.interface';
import { DisciplinesDB } from './disciplines.interface';
import { GroupsService } from '../groups/groups.service';
import { StudentDB } from '../students/students.interface';

export interface IDisciplineWithTeachers extends DisciplinesDB {
  teacherIds: string[];
  marksAreas: {
    five: number;
    four: number;
    three: number;
  };
}

export interface IGroupsWithStudents extends GroupDB {
  students: StudentDB[];
}

@Injectable()
export class DisciplinesService {
  constructor(
    private readonly knexService: KnexService,
    private readonly disciplinesTeachersService: DisciplinesTeachersService,
    private readonly studentsDisciplinesService: StudentsDisciplinesService,
    private readonly studentsService: StudentsService,
    private readonly groupsService: GroupsService,
  ) {}

  async getDiscipline(id: string): Promise<DisciplinesDB> {
    const knex = this.knexService.getKnex();

    const [discipline] = await knex<DisciplinesDB>('disciplines')
      .where('id', id)
      .select('*');

    return discipline;
  }

  async updateDiscipline(
    id: string,
    disciplineData: Omit<DisciplinesDB, 'id'>,
  ): Promise<void> {
    const knex = this.knexService.getKnex();

    await knex<DisciplinesDB>('disciplines')
      .where('id', id)
      .update(disciplineData);
  }

  async createDiscipline(
    disciplineData: Omit<DisciplinesDB, 'id'>,
  ): Promise<string> {
    const knex = this.knexService.getKnex();

    const id = uuid();

    await knex<DisciplinesDB>('disciplines').insert({
      id,
      ...disciplineData,
    });

    return id;
  }

  async deleteDiscipline(id: string): Promise<void> {
    const knex = this.knexService.getKnex();

    await knex<DisciplinesDB>('disciplines')
      .where('id', id)
      .update('deleted', true);
  }

  async getDisciplinesWithTeachers(
    semesterId: string,
  ): Promise<IDisciplineWithTeachers[]> {
    const knex = this.knexService.getKnex();

    const disciplinesTeachers = await knex<DisciplinesDB>('disciplines')
      .leftJoin(
        'disciplines-teachers',
        'disciplines.id',
        'disciplines-teachers.disciplineId',
      )
      .select([
        'disciplineValue',
        'semesterId',
        'disciplineId',
        'teacherId',
        'attendanceWeight',
        'countWithAttendance',
        'five',
        'four',
        'three',
      ])
      .where('semesterId', semesterId)
      .andWhere('deleted', false);

    return disciplinesTeachers.reduce(
      (acc, { disciplineId, teacherId, ...disciplineWithTeachers }) => {
        const discipline = R.find(R.propEq('id', disciplineId))(acc);

        const accWithoutCurrent = acc.filter(
          R.complement(R.propEq('id', disciplineId)),
        );

        const pushTeacherToDiscipline = R.evolve({
          teacherIds: R.append(teacherId),
        });

        if (!discipline) {
          return [
            ...acc,
            {
              id: disciplineId,
              teacherIds: [teacherId],
              disciplineValue: disciplineWithTeachers.disciplineValue,
              attendanceWeight: disciplineWithTeachers.attendanceWeight,
              countWithAttendance: disciplineWithTeachers.countWithAttendance,
              semesterId: disciplineWithTeachers.semesterId,
              marksAreas: {
                five: disciplineWithTeachers.five,
                four: disciplineWithTeachers.four,
                three: disciplineWithTeachers.three,
              },
            },
          ];
        }

        return [
          ...accWithoutCurrent,
          {
            ...pushTeacherToDiscipline(discipline),
          },
        ];
      },
      [],
    );
  }

  async updateDisciplineWithTeachers(
    disciplineId: string,
    disciplineWithTeachers: IDisciplineWithTeachers,
  ): Promise<void> {
    const updatedTeacherIds = disciplineWithTeachers.teacherIds;
    const currentTeacherIds = await this.disciplinesTeachersService.getDisciplineTeacherIds(
      disciplineId,
    );

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
        disciplineId,
      }),
    );

    const disciplineDataToUpdate = {
      disciplineValue: disciplineWithTeachers.disciplineValue,
      attendanceWeight: disciplineWithTeachers.attendanceWeight,
      countWithAttendance: disciplineWithTeachers.countWithAttendance,
      semesterId: disciplineWithTeachers.semesterId,
      ...disciplineWithTeachers.marksAreas,
    };

    await this.updateDiscipline(disciplineId, disciplineDataToUpdate);

    if (!R.isEmpty(teacherIdsToAddToDiscipline)) {
      await this.disciplinesTeachersService.addDisciplineTeachers(
        teachersWithDisciplineIdToAdd,
      );
    }

    if (!R.isEmpty(teacherIdsToRemoveFromDiscipline)) {
      await this.disciplinesTeachersService.deleteDisciplineTeachers(
        disciplineId,
        teacherIdsToRemoveFromDiscipline,
      );
    }
  }

  async createDisciplineWithTeachers(
    disciplineWithTeachers: IDisciplineWithTeachers,
  ): Promise<void> {
    const disciplineDataToAdd = {
      disciplineValue: disciplineWithTeachers.disciplineValue,
      attendanceWeight: disciplineWithTeachers.attendanceWeight,
      countWithAttendance: disciplineWithTeachers.countWithAttendance,
      semesterId: disciplineWithTeachers.semesterId,
      ...disciplineWithTeachers.marksAreas,
    };

    const disciplineId = await this.createDiscipline(disciplineDataToAdd);

    const teachersWithDisciplineIdToAdd = disciplineWithTeachers.teacherIds.map(
      (teacherId) => ({
        teacherId,
        disciplineId,
      }),
    );

    if (!R.isEmpty(teachersWithDisciplineIdToAdd)) {
      await this.disciplinesTeachersService.addDisciplineTeachers(
        teachersWithDisciplineIdToAdd,
      );
    }
  }

  async deleteDisciplineWithTeachers(disciplineId: string): Promise<void> {
    await this.disciplinesTeachersService.deleteAllDisciplineTeachers(
      disciplineId,
    );

    await this.deleteDiscipline(disciplineId);
  }

  async getStudentsWithDiscipline(
    disciplineId: string,
  ): Promise<IGroupsWithStudents[]> {
    const groups = await this.groupsService.getGroups();

    const students = await this.studentsService.getAllStudents();

    const studentIdsWithDiscipline = await this.studentsDisciplinesService.getStudentIdsByDisciplineId(
      disciplineId,
    );

    const getGroupNumber = (groupId: string): string => {
      return R.pipe(
        R.find(R.propEq('id', groupId)),
        R.prop('groupNumber'),
      )(groups);
    };

    const isStudentInDiscipline = R.contains(R.__, studentIdsWithDiscipline);

    const groupsWithStudents = R.pipe(
      R.groupBy(R.prop('groupId')),
      R.toPairs,
      R.map(([groupId, students]) => ({
        groupId,
        students,
      })),
    )(students);

    return R.map(({ groupId, students }) => {
      return {
        id: groupId,
        groupNumber: getGroupNumber(groupId),
        students: students.map(({ id, ...studentData }) => ({
          id,
          ...studentData,
          isInDiscipline: isStudentInDiscipline(id),
        })),
      };
    })(groupsWithStudents);
  }

  async updateStudentsWithDiscipline(
    disciplineId: string,
    groupsWithStudents: IGroupsWithStudents[],
  ): Promise<void> {
    const currentStudentsWithDisciplineIds = await this.studentsDisciplinesService.getStudentIdsByDisciplineId(
      disciplineId,
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
        studentId,
        disciplineId,
      })),
    )(studentIdsToAddToDiscipline);

    if (!R.isEmpty(studentsWithDisciplineIdToAdd)) {
      await this.studentsDisciplinesService.addStudentsWithDiscipline(
        studentsWithDisciplineIdToAdd,
      );
    }

    if (!R.isEmpty(studentIdsToRemoveFromDiscipline)) {
      await this.studentsDisciplinesService.deleteStudentsWithDiscipline(
        disciplineId,
        studentIdsToRemoveFromDiscipline,
      );
    }
  }

  async getDisciplineGroups(disciplineId: string): Promise<GroupDB[]> {
    const studentIds = await this.studentsDisciplinesService.getStudentIdsByDisciplineId(
      disciplineId,
    );

    const students = await this.studentsService.getStudentsByIds(studentIds);

    const groupIds = R.pipe(R.map(R.prop('groupId')), R.uniq)(students);

    return await this.groupsService.getGroupsByIds(groupIds);
  }
}
