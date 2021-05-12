import { Test, TestingModule } from '@nestjs/testing';
import { GroupsService } from './groups.service';
import { KnexModule } from '../knex/knex.module';
import { StudentsModule } from '../students/students.module';

import knexConfig from '../knex/knex.config';

describe('GroupsService', () => {
  let service: GroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [KnexModule.register(knexConfig), StudentsModule],
      providers: [GroupsService],
    }).compile();

    service = module.get<GroupsService>(GroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
