import { Test, TestingModule } from '@nestjs/testing';
import { DisciplinesService } from './disciplines.service';
import { KnexModule } from '../knex/knex.module';
import knexConfig from '../knex/knex.config';
import { DisciplinesTeachersModule } from '../disciplines-teachers/disciplines-teachers.module';
import { GroupsModule } from '../groups/groups.module';
import { StudentsDisciplinesModule } from '../students-disciplines/students-disciplines.module';
import { StudentsModule } from '../students/students.module';

describe('DisciplinesService', () => {
  let service: DisciplinesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        KnexModule.register(knexConfig),
        DisciplinesTeachersModule,
        GroupsModule,
        StudentsDisciplinesModule,
        StudentsModule,
      ],
      providers: [DisciplinesService],
    }).compile();

    service = module.get<DisciplinesService>(DisciplinesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
