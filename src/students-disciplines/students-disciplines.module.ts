import { Module } from '@nestjs/common';
import { StudentsDisciplinesService } from './students-disciplines.service';
import { KnexModule } from '../knex/knex.module';
import knexConfig from '../knex/knex.config';

@Module({
  imports: [KnexModule.register(knexConfig)],
  providers: [StudentsDisciplinesService],
  exports: [StudentsDisciplinesService],
})
export class StudentsDisciplinesModule {}
