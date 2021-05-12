import { Test, TestingModule } from '@nestjs/testing';
import { MarksService } from './marks.service';
import { KnexModule } from '../knex/knex.module';
import knexConfig from '../knex/knex.config';
import { JobsModule } from '../jobs/jobs.module';
import { DisciplinesModule } from '../disciplines/disciplines.module';

describe('MarksService', () => {
  let service: MarksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [KnexModule.register(knexConfig), JobsModule, DisciplinesModule],
      providers: [MarksService],
    }).compile();

    service = module.get<MarksService>(MarksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
