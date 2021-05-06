import { Module } from '@nestjs/common';
import { KnexModule } from '../knex/knex.module';
import knexConfig from '../knex/knex.config';
import { DisciplinesTeachersService } from './disciplines-teachers.service';

@Module({
  imports: [KnexModule.register(knexConfig)],
  providers: [DisciplinesTeachersService],
  exports: [DisciplinesTeachersService],
})
export class DisciplinesTeachersModule {}
