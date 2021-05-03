import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { KnexService } from '../knex/knex.service';

import { ForcefullyOmit } from '../../common/types/forcefully-omit';
import { Teacher, TeacherDB } from './teachers.interface';

const bcrypt = require('bcryptjs');

@Injectable()
export class TeachersService {
  constructor(private readonly knexService: KnexService) {}

  async findOne(email: string): Promise<Teacher> {
    const knex = this.knexService.getKnex();

    return knex<Teacher>('teachers').where({ email }).first();
  }

  async getAll(): Promise<ForcefullyOmit<Teacher, 'password'>[]> {
    const knex = this.knexService.getKnex();

    return knex
      .from<TeacherDB>('teachers')
      .select(['firstName', 'lastName', 'id', 'email', 'isAdmin'])
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
