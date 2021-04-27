import { Module } from '@nestjs/common';

import { TeachersService } from './teachers.service';
import { KnexModule } from '../knex/knex.module';

import knexConfig from '../knex/knex.config';

@Module({
  imports: [KnexModule.register(knexConfig)],
  providers: [TeachersService],
  exports: [TeachersService],
})
export class TeachersModule {}
