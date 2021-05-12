import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceMarksService } from './attendance-marks.service';
import { KnexModule } from '../knex/knex.module';
import knexConfig from '../knex/knex.config';

describe('AttendanceMarksService', () => {
  let service: AttendanceMarksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [KnexModule.register(knexConfig)],
      providers: [AttendanceMarksService],
    }).compile();

    service = module.get<AttendanceMarksService>(AttendanceMarksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
