import * as R from 'ramda';
import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';

import { KnexService } from '../knex/knex.service';

import { GroupDB } from './groups.interface';
import { StudentDB } from '../students/students.interface';
import { StudentsService } from '../students/students.service';

export interface IGroupWithStudents extends GroupDB {
  students: StudentDB[];
}

@Injectable()
export class GroupsService {
  constructor(
    private readonly knexService: KnexService,
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
}
