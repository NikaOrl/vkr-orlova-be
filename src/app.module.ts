import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DisciplinesController } from './disciplines/disciplines.controller';
import { GroupsController } from './groups/groups.controller';
import { JobsController } from './jobs/jobs.controller';
import { MarksController } from './marks/marks.controller';
import { StudentsController } from './students/students.controller';
import { TeachersController } from './teachers/teachers.controller';
import { LoginController } from './login/login.controller';

@Module({
  imports: [],
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
  providers: [AppService],
})
export class AppModule {}
