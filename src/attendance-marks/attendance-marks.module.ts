import { Module } from '@nestjs/common';
import { AttendanceMarksService } from './attendance-marks.service';
import { KnexModule } from '../knex/knex.module';
import knexConfig from '../knex/knex.config';

@Module({
  imports: [KnexModule.register(knexConfig)],
  providers: [AttendanceMarksService],
  exports: [AttendanceMarksService],
})
export class AttendanceMarksModule {}
