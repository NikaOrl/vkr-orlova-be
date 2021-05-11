import { Test, TestingModule } from '@nestjs/testing';
import { JobsService } from './jobs.service';
import { KnexModule } from '../knex/knex.module';
import knexConfig from '../knex/knex.config';

describe('JobsService', () => {
  let service: JobsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [KnexModule.register(knexConfig)],
      providers: [JobsService],
    }).compile();

    service = module.get<JobsService>(JobsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
