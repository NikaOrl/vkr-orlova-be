import { Module } from '@nestjs/common';

import { DisciplinesService } from './disciplines.service';
import { KnexModule } from '../knex/knex.module';

import knexConfig from '../knex/knex.config';

@Module({
  imports: [KnexModule.register(knexConfig)],
  providers: [DisciplinesService],
  exports: [DisciplinesService],
})
export class DisciplinesModule {}
