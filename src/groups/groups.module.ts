import { Module } from '@nestjs/common';

import { KnexModule } from '../knex/knex.module';
import { GroupsService } from './groups.service';
import { StudentsModule } from '../students/students.module';
import { GenerateTableModule } from '../generate-table/generate-table.module';

import knexConfig from '../knex/knex.config';

@Module({
  imports: [
    KnexModule.register(knexConfig),
    StudentsModule,
    GenerateTableModule,
  ],
  providers: [GroupsService],
  exports: [GroupsService],
})
export class GroupsModule {}
