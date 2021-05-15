import * as R from 'ramda';
import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';

import { KnexService } from '../knex/knex.service';

import { GroupDB } from './groups.interface';
import { StudentDB } from '../students/students.interface';
import { StudentsService } from '../students/students.service';
import { GenerateTableService } from '../generate-table/generate-table.service';

const TableColumns = {
  NUMBER_IN_LIST: 'numberInList',
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  EMAIL: 'email',
  HEAD_STUDENT: 'headStudent',
};

const UploadTableFields = {
  FIO: 'ФИО',
  GROUP: 'Группа',
  EMAIL: 'Email',
};

//   [
//   <1 empty item>, 'Студ. билет',
//   'ФИО',          'Номер дела',
//   'Факультет',    'Направление',
//   'Форма',        'Ист. фин.',
//   'Группа',       'Начало',
//   'Конец',        'Email'
// ],

export interface IStudentsGroupTable {
  stream: Buffer;
  groupNumber: string;
}

export interface IGroupWithStudents extends GroupDB {
  students: StudentDB[];
}

const mapIndexed = R.addIndex(R.map);

@Injectable()
export class GroupsService {
  constructor(
    private readonly knexService: KnexService,
    private readonly generateTableService: GenerateTableService,
    private readonly studentsService: StudentsService,
  ) {}

  async getGroups(): Promise<GroupDB[]> {
    const knex = this.knexService.getKnex();

    return knex<GroupDB>('groups').select('*');
  }

  async findGroupByGroupNumber(groupNumber: string): Promise<GroupDB> {
    const knex = this.knexService.getKnex();

    const [group] = await knex<GroupDB>('groups')
      .where('groupNumber', groupNumber)
      .select('*');

    return group;
  }

  async getGroupsByIds(ids: string[]): Promise<GroupDB[]> {
    const knex = this.knexService.getKnex();

    return knex<GroupDB>('groups').whereIn('id', ids).select('*');
  }

  async getGroupWithStudents(groupId: string): Promise<IGroupWithStudents> {
    const knex = this.knexService.getKnex();

    const [group] = await knex<GroupDB>('groups')
      .where('id', groupId)
      .select('*');

    const students = await this.studentsService.getStudentsByGroup(groupId);

    return {
      ...group,
      students,
    };
  }

  async updateGroup(id: string, groupData: GroupDB): Promise<void> {
    const knex = this.knexService.getKnex();

    await knex<GroupDB>('groups').where('id', id).update(groupData);
  }

  async createGroup(groupData: Omit<GroupDB, 'id'>): Promise<string> {
    const knex = this.knexService.getKnex();

    const id = uuid();

    await knex<GroupDB>('groups').insert({
      id,
      ...groupData,
    });

    return id;
  }

  async createGroupWithStudents(
    groupWithStudents: IGroupWithStudents,
  ): Promise<void> {
    const groupData = R.omit(['students'])(groupWithStudents);

    const groupId = await this.createGroup(groupData);

    const studentsToCreate = R.pipe(
      R.prop('students'),
      R.map(R.set(R.lensProp('groupId'), groupId)),
    )(groupWithStudents);

    await this.studentsService.createStudents(studentsToCreate);
  }

  async updateGroupWithStudents(
    groupId: string,
    groupWithStudents: IGroupWithStudents,
  ): Promise<void> {
    const groupData = R.omit(['students'])(groupWithStudents);

    await this.updateGroup(groupId, groupData);

    const students = R.pipe(
      R.prop('students'),
      R.map((student: StudentDB) => {
        return {
          ...student,
          groupId,
        };
      }),
    )(groupWithStudents);

    await Promise.all(
      students.map(async (student) => {
        await this.studentsService.studentCDU(student);
      }),
    );
  }

  async getGroupById(id: string): Promise<GroupDB> {
    const knex = this.knexService.getKnex();

    const [group] = await knex<GroupDB>('groups').where('id', id).select('*');

    return group;
  }

  async getStudentsByGroupTable(groupId: string): Promise<IStudentsGroupTable> {
    const headers = [
      { header: 'Номер в списке', key: TableColumns.NUMBER_IN_LIST, width: 10 },
      { header: 'Имя', key: TableColumns.FIRST_NAME, width: 50 },
      { header: 'Фамилия', key: TableColumns.LAST_NAME, width: 50 },
      { header: 'Email', key: TableColumns.EMAIL, width: 50 },
      { header: 'Староста', key: TableColumns.HEAD_STUDENT, width: 5 },
    ];

    const students = await this.studentsService.getStudentsByGroup(groupId);

    const studentsForTable = R.map(
      ({ firstName, lastName, email, numberInList, headStudent }) => ({
        [TableColumns.NUMBER_IN_LIST]: numberInList,
        [TableColumns.FIRST_NAME]: firstName,
        [TableColumns.LAST_NAME]: lastName,
        [TableColumns.EMAIL]: email,
        [TableColumns.HEAD_STUDENT]: headStudent,
      }),
    )(students);

    const group = await this.getGroupById(groupId);

    const stream = await this.generateTableService.createExcel(
      headers,
      studentsForTable,
    );

    return {
      stream,
      groupNumber: group.groupNumber,
    };
  }

  async uploadStudentsFromFile(file): Promise<void> {
    const table = await this.generateTableService.parseExcel(file.buffer);

    const fields = R.head(table);
    const tableData = R.drop(1, table);

    const fioIndex = R.findIndex(R.equals(UploadTableFields.FIO), fields);
    const groupIndex = R.findIndex(R.equals(UploadTableFields.GROUP), fields);
    const emailIndex = R.findIndex(R.equals(UploadTableFields.EMAIL), fields);

    const students = R.pipe(
      R.map((studentData) => ({
        fio: studentData[fioIndex],
        group: studentData[groupIndex].toString(),
        email: studentData[emailIndex],
      })),
      R.map(({ fio, ...data }) => {
        const [lastName, firstName] = fio.split(' ');

        return {
          firstName,
          lastName,
          ...data,
        };
      }),
    )(tableData);

    const updateStudents = R.pipe(
      R.map(R.omit(['group'])),
      mapIndexed((student, index) => ({
        ...student,
        numberInList: index,
      })),
    );

    const groupsWithStudents = R.pipe(
      R.groupBy(R.prop('group')),
      R.toPairs,
      R.map(([groupNumber, students]) => ({
        groupNumber,
        students: updateStudents(students),
      })),
    )(students);

    await Promise.all(
      groupsWithStudents.map(async (groupsWithStudent) => {
        const group = await this.findGroupByGroupNumber(
          groupsWithStudent.groupNumber,
        );
        console.log(group, R.isNil(group));

        if (R.isNil(group)) {
          await this.createGroupWithStudents(groupsWithStudent);

          return;
        }

        const studentsToAdd = R.map(R.set(R.lensProp('groupId'), group.id))(
          groupsWithStudent.students,
        );

        await this.studentsService.createStudents(studentsToAdd);
      }),
    );
  }
}
