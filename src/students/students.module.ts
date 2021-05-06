import { Module } from '@nestjs/common';

import { KnexModule } from '../knex/knex.module';
import { StudentsService } from './students.service';

import knexConfig from '../knex/knex.config';

@Module({
  imports: [KnexModule.register(knexConfig)],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}
