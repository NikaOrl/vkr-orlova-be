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
import { UsersModule } from './users/users.module';

import knexConfig from './knex/knex.config';
import { LoggerMiddleware } from './logger';

@Module({
  imports: [KnexModule.register(knexConfig), AuthModule, UsersModule],
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
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
