import { Test, TestingModule } from '@nestjs/testing';
import { StudentsDisciplinesService } from './students-disciplines.service';
import { KnexModule } from '../knex/knex.module';
import knexConfig from '../knex/knex.config';

describe('StudentsDisciplinesService', () => {
  let service: StudentsDisciplinesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [KnexModule.register(knexConfig)],
      providers: [StudentsDisciplinesService],
    }).compile();

    service = module.get<StudentsDisciplinesService>(
      StudentsDisciplinesService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
