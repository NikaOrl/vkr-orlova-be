import { Injectable } from '@nestjs/common';
import { KnexService } from '../knex/knex.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs');

@Injectable()
export class TeachersService {
  constructor(private readonly knexService: KnexService) {}

  async getAll() {
    const knex = this.knexService.getKnex();

    return (
      knex
        .from('teachers')
        // .select(['firstName', 'lastName', 'id', 'email', 'isAdmin']);
        .select(['firstName', 'lastName', 'id', 'email', 'isAdmin', 'deleted'])
        .andWhere('deleted', false)
    );
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

    return knex('teachers').whereIn('id', ids).update('deleted', true); // in case of deleted flag
    // .del(); // in case of real deleting
  }

  async createTeachers(teacherData) {
    const knex = this.knexService.getKnex();

    const salt = bcrypt.genSaltSync();
    const passwordHash = bcrypt.hashSync(teacherData.password, salt);

    return knex('teachers').insert({
      email: teacherData.email,
      password: passwordHash,
      firstName: teacherData.firstName,
      lastName: teacherData.lastName,
      isAdmin: teacherData.isAdmin,
    });
  }
}
