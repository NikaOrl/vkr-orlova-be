import { Test, TestingModule } from '@nestjs/testing';
import { GenerateDatabaseService } from './generate-database.service';

describe('GenerateDatabaseService', () => {
  let service: GenerateDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenerateDatabaseService],
    }).compile();

    service = module.get<GenerateDatabaseService>(GenerateDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
