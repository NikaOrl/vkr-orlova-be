import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceMarksService } from './attendance-marks.service';

describe('AttendanceMarksService', () => {
  let service: AttendanceMarksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttendanceMarksService],
    }).compile();

    service = module.get<AttendanceMarksService>(AttendanceMarksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
