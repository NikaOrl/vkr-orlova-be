import { Test, TestingModule } from '@nestjs/testing';
import { ModulesController } from './modules.controller';
import { KnexModule } from '../knex/knex.module';
import knexConfig from '../knex/knex.config';
import { JobsModule } from '../jobs/jobs.module';
import { ModulesModule } from './modules.module';

describe('ModulesController', () => {
  let controller: ModulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [KnexModule.register(knexConfig), JobsModule, ModulesModule],
      controllers: [ModulesController],
    }).compile();

    controller = module.get<ModulesController>(ModulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
