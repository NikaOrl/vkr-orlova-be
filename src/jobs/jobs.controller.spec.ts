import { Test, TestingModule } from '@nestjs/testing';
import { JobsController } from './jobs.controller';
import { KnexModule } from '../knex/knex.module';
import knexConfig from '../knex/knex.config';
import { JobsModule } from './jobs.module';

describe('JobsController', () => {
  let controller: JobsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [KnexModule.register(knexConfig), JobsModule],
      controllers: [JobsController],
    }).compile();

    controller = module.get<JobsController>(JobsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
