import { Test, TestingModule } from '@nestjs/testing';
import { AttendancesService } from './attendances.service';
import { KnexModule } from '../knex/knex.module';
import { AttendanceMarksModule } from '../attendance-marks/attendance-marks.module';
import knexConfig from '../knex/knex.config';

describe('AttendancesService', () => {
  let service: AttendancesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [KnexModule.register(knexConfig), AttendanceMarksModule],
      providers: [AttendancesService],
    }).compile();

    service = module.get<AttendancesService>(AttendancesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
