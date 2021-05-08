import * as R from 'ramda';
import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';

import { KnexService } from '../knex/knex.service';
import { GenerateTableService } from '../generate-table/generate-table.service';

import { StudentDB } from './students.interface';
import { GroupsService } from '../groups/groups.service';

const TableColumns = {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  EMAIL: 'email',
};

export interface IStudentsByGroupTable {
  stream: Buffer;
  groupNumber: string;
}

@Injectable()
export class StudentsService {
  constructor(
    private readonly knexService: KnexService,
    private readonly generateTableService: GenerateTableService,
    private readonly groupsService: GroupsService,
  ) {}

  async getStudentsById(ids: string[]): Promise<StudentDB[]> {
    const knex = this.knexService.getKnex();

    return knex<StudentDB>('students')
      .select('*')
      .whereIn('id', ids)
      .andWhere('deleted', false);
  }

  async getStudentsByGroup(groupId: string): Promise<StudentDB[]> {
    const knex = this.knexService.getKnex();

    return knex
      .from('students')
      .select('*')
      .where('groupId', groupId)
      .andWhere('deleted', false);
  }

  async addStudent(studentData) {
    const knex = this.knexService.getKnex();

    await knex('students').insert({
      id: uuid(),
      ...studentData,
    });
  }

  async updateStudent(id, data) {
    const knex = this.knexService.getKnex();
    console.log(id, data);
    await knex('students').where('id', id).update(data);
  }

  async deleteStudents(ids: Array<string>) {
    const knex = this.knexService.getKnex();

    return knex('students').whereIn('id', ids).update('deleted', true);
  }

  async getStudentsByGroupTable(
    groupId: string,
  ): Promise<IStudentsByGroupTable> {
    const headers = [
      { header: 'Имя', key: TableColumns.FIRST_NAME, width: 50 },
      { header: 'Фамилия', key: TableColumns.LAST_NAME, width: 50 },
      { header: 'Email', key: TableColumns.EMAIL, width: 50 },
    ];

    const students = await this.getStudentsByGroup(groupId);

    const studentsForTable = R.map(({ firstName, lastName, email }) => ({
      [TableColumns.FIRST_NAME]: firstName,
      [TableColumns.LAST_NAME]: lastName,
      [TableColumns.EMAIL]: email,
    }))(students);

    const group = await this.groupsService.getGroupById(groupId);

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
