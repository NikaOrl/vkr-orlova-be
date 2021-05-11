import { Test, TestingModule } from '@nestjs/testing';
import { MarksController } from './marks.controller';
import { KnexModule } from '../knex/knex.module';
import knexConfig from '../knex/knex.config';
import { JobsModule } from '../jobs/jobs.module';
import { DisciplinesModule } from '../disciplines/disciplines.module';
import { MarksModule } from './marks.module';

describe('MarksController', () => {
  let controller: MarksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        KnexModule.register(knexConfig),
        JobsModule,
        DisciplinesModule,
        MarksModule,
      ],
      controllers: [MarksController],
    }).compile();

    controller = module.get<MarksController>(MarksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
