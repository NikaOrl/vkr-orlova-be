import { Module } from '@nestjs/common';

import { DisciplinesService } from './disciplines.service';
import { KnexModule } from '../knex/knex.module';
import { DisciplinesTeachersModule } from '../disciplines-teachers/disciplines-teachers.module';
import { GroupsModule } from '../groups/groups.module';
import { StudentsDisciplinesModule } from '../students-disciplines/students-disciplines.module';
import { StudentsModule } from '../students/students.module';

import knexConfig from '../knex/knex.config';

@Module({
  imports: [
    KnexModule.register(knexConfig),
    DisciplinesTeachersModule,
    GroupsModule,
    StudentsDisciplinesModule,
    StudentsModule,
  ],
  providers: [DisciplinesService],
  exports: [DisciplinesService],
})
export class DisciplinesModule {}
