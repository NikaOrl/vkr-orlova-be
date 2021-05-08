import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';

import { KnexService } from '../knex/knex.service';

import { StudentDB } from './students.interface';

@Injectable()
export class StudentsService {
  constructor(private readonly knexService: KnexService) {}

  async getStudentsById(ids: string[]): Promise<StudentDB[]> {
    const knex = this.knexService.getKnex();

    return knex<StudentDB>('students')
      .select('*')
      .whereIn('id', ids)
      .andWhere('deleted', false);
  }

  async getStudentsByGroup(groupId: string): Promise<StudentDB[]> {
    const knex = this.knexService.getKnex();

    return knex<StudentDB>('students')
      .select('*')
      .where('groupId', groupId)
      .andWhere('deleted', false);
  }

  async addStudent(studentData: Omit<StudentDB, 'id'>): Promise<void> {
    const knex = this.knexService.getKnex();

    await knex<StudentDB>('students').insert({
      id: uuid(),
      ...studentData,
    });
  }

  async createStudents(students: Omit<StudentDB, 'id'>[]): Promise<void> {
    const knex = this.knexService.getKnex();

    const studentsToAdd = students.map((student) => ({
      id: uuid(),
      ...student,
    }));

    await knex<StudentDB>('students').insert(studentsToAdd);
  }

  async updateStudent(id: string, studentData: StudentDB): Promise<void> {
    const knex = this.knexService.getKnex();

    await knex<StudentDB>('students').where('id', id).update(studentData);
  }

  async deleteStudents(ids: string[]): Promise<void> {
    const knex = this.knexService.getKnex();

    await knex<StudentDB>('students')
      .whereIn('id', ids)
      .update('deleted', true);
  }
}
