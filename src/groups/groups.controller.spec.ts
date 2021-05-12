import { Test, TestingModule } from '@nestjs/testing';
import { GroupsController } from './groups.controller';
import { KnexModule } from '../knex/knex.module';
import { StudentsModule } from '../students/students.module';
import knexConfig from '../knex/knex.config';
import { GroupsModule } from './groups.module';

describe('GroupsController', () => {
  let controller: GroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [KnexModule.register(knexConfig), StudentsModule, GroupsModule],
      controllers: [GroupsController],
    }).compile();

    controller = module.get<GroupsController>(GroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
