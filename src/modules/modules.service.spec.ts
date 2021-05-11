import { Test, TestingModule } from '@nestjs/testing';
import { ModulesService } from './modules.service';
import { KnexModule } from '../knex/knex.module';
import knexConfig from '../knex/knex.config';
import { JobsModule } from '../jobs/jobs.module';

describe('ModulesService', () => {
  let service: ModulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [KnexModule.register(knexConfig), JobsModule],
      providers: [ModulesService],
    }).compile();

    service = module.get<ModulesService>(ModulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
