import * as R from 'ramda';
import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';

import { KnexService } from '../knex/knex.service';

import { Teacher, TeacherDB } from './teachers.interface';

@Injectable()
export class TeachersService {
  constructor(private readonly knexService: KnexService) {}

  async findOne(email: string): Promise<Teacher> {
    const knex = this.knexService.getKnex();

    return knex<Teacher>('teachers').where({ email }).first();
  }

  async getAll(): Promise<Omit<Teacher, 'password'>[]> {
    const knex = this.knexService.getKnex();

    return knex
      .from<TeacherDB>('teachers')
      .select(['firstName', 'lastName', 'id', 'email', 'isAdmin'])
      .andWhere('deleted', false);
  }

  async updateTeacher(id: string, teacherData: TeacherDB): Promise<void> {
    const knex = this.knexService.getKnex();

    const salt = bcrypt.genSaltSync();
    const passwordHash = bcrypt.hashSync(teacherData.password, salt);

    const teachersData = {
      ...teacherData,
      password: passwordHash,
    };

    await knex('teachers').where('id', id).update(teachersData);
  }

  async deleteTeacher(id: string): Promise<void> {
    const knex = this.knexService.getKnex();

    await knex<TeacherDB>('teachers').where('id', id).update('deleted', true);
  }

  async createTeacher(teacherData: Omit<TeacherDB, 'id'>): Promise<string> {
    const knex = this.knexService.getKnex();

    const salt = bcrypt.genSaltSync();
    const passwordHash = bcrypt.hashSync(teacherData.password, salt);

    const id = uuid();

    await knex('teachers').insert({
      id,
      email: teacherData.email,
      password: passwordHash,
      firstName: teacherData.firstName,
      lastName: teacherData.lastName,
      isAdmin: teacherData.isAdmin,
    });

    return id;
  }

  async teacherCDU(teacherData: TeacherDB): Promise<string | void> {
    if (teacherData.deleted) {
      return await this.deleteTeacher(teacherData.id);
    }

    if (!teacherData.id || Number(teacherData.id) < 0) {
      const newAttendanceData = R.omit(['id'])(teacherData);

      return await this.createTeacher(newAttendanceData);
    }

    return await this.updateTeacher(teacherData.id, teacherData);
  }
}
