import { Module } from '@nestjs/common';

import { KnexModule } from '../knex/knex.module';
import { GenerateTableModule } from '../generate-table/generate-table.module';
import { StudentsService } from './students.service';
import { GroupsModule } from '../groups/groups.module';

import knexConfig from '../knex/knex.config';

@Module({
  imports: [KnexModule.register(knexConfig), GenerateTableModule, GroupsModule],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}
