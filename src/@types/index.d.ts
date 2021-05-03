import { TeacherDB } from '../teachers/teachers.interface';
import { ModuleDB } from '../modules/modules.interface';
import {
  DisciplinesDB,
  DisciplineTeacherDB,
} from '../disciplines/disciplines.interface';
import { GroupDB } from '../groups/groups.interface';
import { JobDB } from '../jobs/jobs.interface';
import { MarkDB } from '../marks/marks.interface';
import { StudentDB, StudentDisciplineDB } from '../students/students.interface';

declare module 'knex/types/tables' {
  interface Tables {
    disciplines: DisciplinesDB;
    'disciplines-teachers': DisciplineTeacherDB;
    groups: GroupDB;
    jobs: JobDB;
    marks: MarkDB;
    modules: ModuleDB;
    students: StudentDB;
    'students-disciplines': StudentDisciplineDB;
    teachers: TeacherDB;
  }
}
