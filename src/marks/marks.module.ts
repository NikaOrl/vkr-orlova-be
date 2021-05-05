import { Module } from '@nestjs/common';

import { KnexModule } from '../knex/knex.module';
import { MarksService } from './marks.service';
import { JobsModule } from '../jobs/jobs.module';

import knexConfig from '../knex/knex.config';

@Module({
  imports: [KnexModule.register(knexConfig), JobsModule],
  providers: [MarksService],
  exports: [MarksService],
})
export class MarksModule {}
