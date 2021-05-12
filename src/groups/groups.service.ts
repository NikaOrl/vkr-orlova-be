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

export interface IStudentsGroupTable {
  stream: Buffer;
  groupNumber: string;
}

export interface IGroupWithStudents extends GroupDB {
  students: StudentDB[];
}

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
}
