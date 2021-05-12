import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from './students.controller';
import { KnexModule } from '../knex/knex.module';
import knexConfig from '../knex/knex.config';
import { StudentsModule } from './students.module';

describe('StudentsController', () => {
  let controller: StudentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [KnexModule.register(knexConfig), StudentsModule],
      controllers: [StudentsController],
    }).compile();

    controller = module.get<StudentsController>(StudentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
