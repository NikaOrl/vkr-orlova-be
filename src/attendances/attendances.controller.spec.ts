import { Test, TestingModule } from '@nestjs/testing';
import { AttendancesController } from './attendances.controller';
import { KnexModule } from '../knex/knex.module';
import { AttendanceMarksModule } from '../attendance-marks/attendance-marks.module';
import knexConfig from '../knex/knex.config';
import { AttendancesModule } from './attendances.module';

describe('AttendancesController', () => {
  let controller: AttendancesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        KnexModule.register(knexConfig),
        AttendanceMarksModule,
        AttendancesModule,
      ],
      controllers: [AttendancesController],
    }).compile();

    controller = module.get<AttendancesController>(AttendancesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
