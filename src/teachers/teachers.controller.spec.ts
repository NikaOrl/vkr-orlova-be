import { Test, TestingModule } from '@nestjs/testing';
import { TeachersController } from './teachers.controller';
import { KnexModule } from '../knex/knex.module';
import knexConfig from '../knex/knex.config';
import { TeachersModule } from './teachers.module';

describe('TeachersController', () => {
  let controller: TeachersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [KnexModule.register(knexConfig), TeachersModule],
      controllers: [TeachersController],
    }).compile();

    controller = module.get<TeachersController>(TeachersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
