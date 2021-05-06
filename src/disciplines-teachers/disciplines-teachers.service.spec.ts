import { Test, TestingModule } from '@nestjs/testing';
import { DisciplinesTeachersService } from './disciplines-teachers.service';

describe('DisciplinesTeachersService', () => {
  let service: DisciplinesTeachersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DisciplinesTeachersService],
    }).compile();

    service = module.get<DisciplinesTeachersService>(DisciplinesTeachersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
