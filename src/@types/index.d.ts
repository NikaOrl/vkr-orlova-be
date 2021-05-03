import { TeacherDB } from '../teachers/teachers.interface';

declare module 'knex/types/tables' {
  interface Tables {
    teachers: TeacherDB;
  }
}
