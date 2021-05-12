import { Test, TestingModule } from '@nestjs/testing';
import { DisciplinesController } from './disciplines.controller';
import { KnexModule } from '../knex/knex.module';
import knexConfig from '../knex/knex.config';
import { DisciplinesTeachersModule } from '../disciplines-teachers/disciplines-teachers.module';
import { GroupsModule } from '../groups/groups.module';
import { StudentsDisciplinesModule } from '../students-disciplines/students-disciplines.module';
import { StudentsModule } from '../students/students.module';
import { DisciplinesModule } from './disciplines.module';

describe('DisciplinesController', () => {
  let controller: DisciplinesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        KnexModule.register(knexConfig),
        DisciplinesTeachersModule,
        GroupsModule,
        StudentsDisciplinesModule,
        StudentsModule,
        DisciplinesModule,
      ],
      controllers: [DisciplinesController],
    }).compile();

    controller = module.get<DisciplinesController>(DisciplinesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
