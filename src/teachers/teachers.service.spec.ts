import { Test, TestingModule } from '@nestjs/testing';
import { TeachersService } from './teachers.service';
import { KnexModule } from '../knex/knex.module';
import knexConfig from '../knex/knex.config';

describe('TeachersService', () => {
  let service: TeachersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [KnexModule.register(knexConfig)],
      providers: [TeachersService],
    }).compile();

    service = module.get<TeachersService>(TeachersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
