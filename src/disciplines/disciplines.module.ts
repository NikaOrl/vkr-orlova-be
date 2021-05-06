import { Module } from '@nestjs/common';

import { DisciplinesService } from './disciplines.service';
import { KnexModule } from '../knex/knex.module';
import { DisciplinesTeachersModule } from '../disciplines-teachers/disciplines-teachers.module';

import knexConfig from '../knex/knex.config';

@Module({
  imports: [KnexModule.register(knexConfig), DisciplinesTeachersModule],
  providers: [DisciplinesService],
  exports: [DisciplinesService],
})
export class DisciplinesModule {}
