import { Test, TestingModule } from '@nestjs/testing';
import { DisciplinesTeachersService } from './disciplines-teachers.service';
import { KnexModule } from '../knex/knex.module';
import knexConfig from '../knex/knex.config';

describe('DisciplinesTeachersService', () => {
  let service: DisciplinesTeachersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [KnexModule.register(knexConfig)],
      providers: [DisciplinesTeachersService],
    }).compile();

    service = module.get<DisciplinesTeachersService>(
      DisciplinesTeachersService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
