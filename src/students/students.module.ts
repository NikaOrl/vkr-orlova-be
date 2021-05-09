import { Module } from '@nestjs/common';

import { KnexModule } from '../knex/knex.module';
import { GenerateTableModule } from '../generate-table/generate-table.module';
import { StudentsService } from './students.service';

import knexConfig from '../knex/knex.config';

@Module({
  imports: [KnexModule.register(knexConfig), GenerateTableModule],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}
