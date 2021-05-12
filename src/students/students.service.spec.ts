import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { KnexModule } from '../knex/knex.module';
import knexConfig from '../knex/knex.config';

describe('StudentsService', () => {
  let service: StudentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [KnexModule.register(knexConfig)],
      providers: [StudentsService],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
