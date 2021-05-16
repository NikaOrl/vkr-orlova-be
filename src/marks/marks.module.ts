import { Module } from '@nestjs/common';

import { MarksService } from './marks.service';
import { KnexModule } from '../knex/knex.module';
import { JobsModule } from '../jobs/jobs.module';
import { DisciplinesModule } from '../disciplines/disciplines.module';
import { GenerateTableModule } from '../generate-table/generate-table.module';

import knexConfig from '../knex/knex.config';

@Module({
  imports: [
    KnexModule.register(knexConfig),
    JobsModule,
    DisciplinesModule,
    GenerateTableModule,
  ],
  providers: [MarksService],
  exports: [MarksService],
})
export class MarksModule {}
