import { Test, TestingModule } from '@nestjs/testing';
import { SemestersService } from './semesters.service';
import { KnexModule } from '../knex/knex.module';
import knexConfig from '../knex/knex.config';

describe('SemestersService', () => {
  let service: SemestersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [KnexModule.register(knexConfig)],
      providers: [SemestersService],
    }).compile();

    service = module.get<SemestersService>(SemestersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
