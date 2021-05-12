import { Test, TestingModule } from '@nestjs/testing';
import { GenerateTableService } from './generate-table.service';

describe('GenerateTableService', () => {
  let service: GenerateTableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenerateTableService],
    }).compile();

    service = module.get<GenerateTableService>(GenerateTableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
