import { Module } from '@nestjs/common';

import { KnexModule } from '../knex/knex.module';
import { MarksService } from './marks.service';

import knexConfig from '../knex/knex.config';

@Module({
  imports: [KnexModule.register(knexConfig)],
  providers: [MarksService],
  exports: [MarksService],
})
export class MarksModule {}
