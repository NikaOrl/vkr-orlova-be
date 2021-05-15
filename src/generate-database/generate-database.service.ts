import { Injectable } from '@nestjs/common';

import { KnexService } from '../knex/knex.service';

import { attendanceMarks } from './data/attendanceMarksData';
import { attendances } from './data/attendancesData';
import { disciplines } from './data/disciplinesData';
import { disciplinesTeachers } from './data/disciplinesTeachersData';
import { groups } from './data/groupsData';
import { jobs } from './data/jobsData';
import { marks } from './data/marksData';
import { modules } from './data/modulesData';
import { students } from './data/studentsData';
import { teachers } from './data/teachersData';
import { semesters } from './data/semestersData';
import { studentsDisciplines } from './data/studentsDisciplinesData';

@Injectable()
export class GenerateDatabaseService {
  constructor(private readonly knexService: KnexService) {}

  async createAttendanceMarksTable(): Promise<void> {
    const knex = this.knexService.getKnex();

    await knex.schema
      .createTable('attendance-marks', (table) => {
        table.uuid('id').primary();
        table.string('studentId');
        table.string('attendanceId');
        table.boolean('attendanceMarkValue');
        table.boolean('deleted').defaultTo(false);
      })
      .then(() => console.log('table attendance-marks created'))
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  async createAttendancesTable(): Promise<void> {
    const knex = this.knexService.getKnex();

    knex.schema
      .createTable('attendances', (table) => {
        table.uuid('id').primary();
        table.string('disciplineId');
        table.string('attendanceName');
        table.integer('numberInList');
        table.boolean('deleted').defaultTo(false);
      })
      .then(() => console.log('table attendances created'))
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  async createDisciplinesTable(): Promise<void> {
    const knex = this.knexService.getKnex();

    knex.schema
      .createTable('disciplines', (table) => {
        table.uuid('id').primary();
        table.uuid('semesterId');
        table.string('disciplineValue');
        table.double('attendanceWeight').defaultTo(1);
        table.integer('three').defaultTo(10);
        table.integer('four').defaultTo(20);
        table.integer('five').defaultTo(30);
        table.boolean('countAsAverage').defaultTo(false);
        table.boolean('countWithAttendance').defaultTo(true);
        table.boolean('deleted').defaultTo(false);
      })
      .then(() => console.log('table disciplines created'))
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  async createDisciplinesTeachersTable(): Promise<void> {
    const knex = this.knexService.getKnex();

    knex.schema
      .createTable('disciplines-teachers', (table) => {
        table.uuid('id').primary();
        table.uuid('disciplineId');
        table.uuid('teacherId');
      })
      .then(() => console.log('table disciplines-teachers created'))
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  async createGroupsTable(): Promise<void> {
    const knex = this.knexService.getKnex();

    knex.schema
      .createTable('groups', (table) => {
        table.uuid('id').primary();
        table.string('groupNumber');
        table.boolean('deleted').defaultTo(false);
      })
      .then(() => console.log('table groups created'))
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  async createJobsTable(): Promise<void> {
    const knex = this.knexService.getKnex();

    knex.schema
      .createTable('jobs', (table) => {
        table.uuid('id').primary();
        table.uuid('disciplineId');
        table.uuid('moduleId');
        table.integer('numberInList');
        table.string('jobValue');
        table.integer('maxPoint').defaultTo(0);
        table.boolean('deleted').defaultTo(false);
      })
      .then(() => console.log('table jobs created'))
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  async createMarksTable(): Promise<void> {
    const knex = this.knexService.getKnex();

    knex.schema
      .createTable('marks', (table) => {
        table.uuid('id').primary();
        table.uuid('studentId');
        table.uuid('jobId');
        table.string('markValue');
        table.boolean('deleted').defaultTo(false);
      })
      .then(() => console.log('table marks created'))
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  async createModulesTable(): Promise<void> {
    const knex = this.knexService.getKnex();

    knex.schema
      .createTable('modules', (table) => {
        table.uuid('id').primary();
        table.string('moduleName');
        table.integer('numberInList');
        table.boolean('deleted').defaultTo(false);
      })
      .then(() => console.log('table modules created'))
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  async createSemestersTable(): Promise<void> {
    const knex = this.knexService.getKnex();

    knex.schema
      .createTable('semesters', (table) => {
        table.uuid('id').primary();
        table.string('semesterName');
        table.boolean('deleted').defaultTo(false);
      })
      .then(() => console.log('table modules created'))
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  async createStudentsDisciplinesTable(): Promise<void> {
    const knex = this.knexService.getKnex();

    knex.schema
      .createTable('students-disciplines', (table) => {
        table.uuid('id').primary();
        table.uuid('studentId');
        table.uuid('disciplineId');
      })
      .then(() => console.log('table students-disciplines created'))
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  async createStudentsTable(): Promise<void> {
    const knex = this.knexService.getKnex();

    knex.schema
      .createTable('students', (table) => {
        table.uuid('id').primary();
        table.string('firstName');
        table.string('lastName');
        table.integer('numberInList');
        table.string('email');
        table.uuid('groupId');
        table.boolean('headStudent').defaultTo(false);
        table.boolean('deleted').defaultTo(false);
      })
      .then(() => console.log('table students created'))
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  async createTeachersTable(): Promise<void> {
    const knex = this.knexService.getKnex();

    knex.schema
      .createTable('teachers', (table) => {
        table.uuid('id').primary();
        table.string('firstName');
        table.string('lastName');
        table.string('email');
        table.string('password');
        table.boolean('isAdmin').defaultTo(false);
        table.boolean('deleted').defaultTo(false);
      })
      .then(() => console.log('table teachers created'))
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  async insertAttendanceMarksTable(): Promise<void> {
    const knex = this.knexService.getKnex();

    knex('attendance-marks')
      .insert(attendanceMarks)
      .then(() => console.log('attendance-marks inserted'))
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  async insertAttendancesTable(): Promise<void> {
    const knex = this.knexService.getKnex();

    knex('attendances')
      .insert(attendances)
      .then(() => console.log('attendances inserted'))
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  async insertDisciplinesTable(): Promise<void> {
    const knex = this.knexService.getKnex();

    knex('disciplines')
      .insert(disciplines)
      .then(() => console.log('disciplines inserted'))
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  async insertDisciplinesTeachersTable(): Promise<void> {
    const knex = this.knexService.getKnex();

    knex('disciplines-teachers')
      .insert(disciplinesTeachers)
      .then(() => console.log('disciplines-teachers inserted'))
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  async insertGroupsTable(): Promise<void> {
    const knex = this.knexService.getKnex();

    knex('groups')
      .insert(groups)
      .then(() => console.log('groups inserted'))
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  async insertJobsTable(): Promise<void> {
    const knex = this.knexService.getKnex();

    knex('jobs')
      .insert(jobs)
      .then(() => console.log('jobs inserted'))
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  async insertMarksTable(): Promise<void> {
    const knex = this.knexService.getKnex();

    knex('marks')
      .insert(marks)
      .then(() => console.log('marks inserted'))
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  async insertModulesTable(): Promise<void> {
    const knex = this.knexService.getKnex();

    knex('modules')
      .insert(modules)
      .then(() => console.log('groups inserted'))
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  async insertSemestersTable(): Promise<void> {
    const knex = this.knexService.getKnex();

    knex('semesters')
      .insert(semesters)
      .then(() => console.log('disciplines inserted'))
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  async insertStudentsDisciplinesTable(): Promise<void> {
    const knex = this.knexService.getKnex();

    knex('students-disciplines')
      .insert(studentsDisciplines)
      .then(() => console.log('students-disciplines inserted'))
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  async insertStudentsTable(): Promise<void> {
    const knex = this.knexService.getKnex();

    knex('students')
      .insert(students)
      .then(() => console.log('students inserted'))
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  async insertTeachersTable(): Promise<void> {
    const knex = this.knexService.getKnex();

    knex('teachers')
      .insert(teachers)
      .then(() => console.log('teachers inserted'))
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }
}
