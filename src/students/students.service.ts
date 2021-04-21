import { Injectable } from '@nestjs/common';

import { KnexService } from '../knex/knex.service';

@Injectable()
export class StudentsService {
  constructor(private readonly knexService: KnexService) {}

  async getStudentsByGroup(groupId) {
    const knex = this.knexService.getKnex();

    return knex
      .from('students')
      .select('*')
      .where('groupId', groupId)
      .andWhere('deleted', false);
  }

  async addStudent(studentData) {
    const knex = this.knexService.getKnex();

    await knex('students').insert(studentData);
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
}
