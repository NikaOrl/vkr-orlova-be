import { Test, TestingModule } from '@nestjs/testing';
import { SemestersController } from './semesters.controller';
import { KnexModule } from '../knex/knex.module';
import knexConfig from '../knex/knex.config';
import { SemestersModule } from './semesters.module';

describe('SemestersController', () => {
  let controller: SemestersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [KnexModule.register(knexConfig), SemestersModule],
      controllers: [SemestersController],
    }).compile();

    controller = module.get<SemestersController>(SemestersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
