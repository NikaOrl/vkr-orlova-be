import { Module } from '@nestjs/common';
import { AttendancesController } from './attendances.controller';
import { AttendancesService } from './attendances.service';
import { KnexModule } from '../knex/knex.module';
import knexConfig from '../knex/knex.config';
import { AttendanceMarksModule } from '../attendance-marks/attendance-marks.module';

@Module({
  imports: [KnexModule.register(knexConfig), AttendanceMarksModule],
  controllers: [AttendancesController],
  providers: [AttendancesService],
})
export class AttendancesModule {}
