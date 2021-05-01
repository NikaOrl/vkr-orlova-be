import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { KnexService } from '../knex/knex.service';

const bcrypt = require('bcryptjs');

export type Teacher = any;

@Injectable()
export class TeachersService {
  constructor(private readonly knexService: KnexService) {}

  async findOne(email: string): Promise<Teacher | undefined> {
    const knex = this.knexService.getKnex();

    return knex('teachers').where({ email }).first();
  }

  async getAll() {
    const knex = this.knexService.getKnex();

    return knex
      .from('teachers')
      .select(['firstName', 'lastName', 'id', 'email', 'isAdmin', 'deleted'])
      .andWhere('deleted', false);
  }

  async updateTeacher(id, data) {
    const knex = this.knexService.getKnex();

    try {
      const salt = bcrypt.genSaltSync();
      const passwordHash = bcrypt.hashSync(data.password, salt);

      const teachersData = {
        ...data,
        password: passwordHash,
      };

      const result = await knex('teachers')
        .where('id', id)
        .update(teachersData);

      if (result) {
        console.log(`teacher was updated`);
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async deleteTeachers(ids: Array<string>) {
    const knex = this.knexService.getKnex();

    return knex('teachers').whereIn('id', ids).update('deleted', true);
  }

  async createTeachers(teacherData) {
    const knex = this.knexService.getKnex();

    const salt = bcrypt.genSaltSync();
    const passwordHash = bcrypt.hashSync(teacherData.password, salt);

    return knex('teachers').insert({
      id: uuid(),
      email: teacherData.email,
      password: passwordHash,
      firstName: teacherData.firstName,
      lastName: teacherData.lastName,
      isAdmin: teacherData.isAdmin,
    });
  }
}
