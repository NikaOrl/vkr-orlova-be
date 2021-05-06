import { Test, TestingModule } from '@nestjs/testing';
import { StudentsDisciplinesService } from './students-disciplines.service';

describe('StudentsDisciplinesService', () => {
  let service: StudentsDisciplinesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentsDisciplinesService],
    }).compile();

    service = module.get<StudentsDisciplinesService>(StudentsDisciplinesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
