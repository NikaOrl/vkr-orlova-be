import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DisciplinesController } from './disciplines/disciplines.controller';
import { GroupsController } from './groups/groups.controller';
import { JobsController } from './jobs/jobs.controller';
import { MarksController } from './marks/marks.controller';
import { StudentsController } from './students/students.controller';
import { TeachersController } from './teachers/teachers.controller';
import { LoginController } from './login/login.controller';
import { TeachersService } from './teachers/teachers.service';
import { KnexService } from './knex/knex.service';
import { KnexModule } from './knex/knex.module';
import { StudentsService } from './students/students.service';
import { DisciplinesService } from './disciplines/disciplines.service';
import { GroupsService } from './groups/groups.service';
import { JobsService } from './jobs/jobs.service';
import { MarksService } from './marks/marks.service';
import { LoginService } from './login/login.service';
import { AuthModule } from './auth/auth.module';
import { TeachersModule } from './teachers/teachers.module';

import knexConfig from './knex/knex.config';
import { LoggerMiddleware } from './logger';
import { MarksModule } from './marks/marks.module';
import { DisciplinesModule } from './disciplines/disciplines.module';
import { ModulesModule } from './modules/modules.module';
import { AttendancesModule } from './attendances/attendances.module';
import { AttendanceMarksModule } from './attendance-marks/attendance-marks.module';
import { JobsModule } from './jobs/jobs.module';
import { DisciplinesTeachersService } from './disciplines-teachers/disciplines-teachers.service';
import { DisciplinesTeachersModule } from './disciplines-teachers/disciplines-teachers.module';
import { GroupsModule } from './groups/groups.module';
import { StudentsDisciplinesModule } from './students-disciplines/students-disciplines.module';
import { StudentsModule } from './students/students.module';
import { SemestersModule } from './semesters/semesters.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [
    KnexModule.register(knexConfig),
    AuthModule,
    TeachersModule,
    MarksModule,
    DisciplinesModule,
    ModulesModule,
    AttendancesModule,
    AttendanceMarksModule,
    JobsModule,
    DisciplinesTeachersModule,
    GroupsModule,
    StudentsDisciplinesModule,
    StudentsModule,
    SemestersModule,
    LoginModule,
  ],
  controllers: [
    AppController,
    DisciplinesController,
    GroupsController,
    JobsController,
    MarksController,
    StudentsController,
    TeachersController,
    LoginController,
  ],
  providers: [
    AppService,
    TeachersService,
    KnexService,
    {
      provide: 'CONFIG_OPTIONS',
      useValue: knexConfig,
    },
    StudentsService,
    DisciplinesService,
    GroupsService,
    JobsService,
    MarksService,
    LoginService,
    DisciplinesTeachersService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
