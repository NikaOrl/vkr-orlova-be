import { Controller, Get } from '@nestjs/common';

import { GenerateDatabaseService } from './generate-database.service';

@Controller('generate-database')
export class GenerateDatabaseController {
  constructor(
    private readonly generateDatabaseService: GenerateDatabaseService,
  ) {}

  @Get('create')
  async createTables(): Promise<void> {
    await this.generateDatabaseService.createAttendanceMarksTable();
    await this.generateDatabaseService.createAttendancesTable();
    await this.generateDatabaseService.createDisciplinesTable();
    await this.generateDatabaseService.createDisciplinesTeachersTable();
    await this.generateDatabaseService.createGroupsTable();
    await this.generateDatabaseService.createJobsTable();
    await this.generateDatabaseService.createMarksTable();
    await this.generateDatabaseService.createModulesTable();
    await this.generateDatabaseService.createSemestersTable();
    await this.generateDatabaseService.createStudentsDisciplinesTable();
    await this.generateDatabaseService.createStudentsTable();
    await this.generateDatabaseService.createTeachersTable();
  }

  @Get('insert')
  async insertDataToTables(): Promise<void> {
    await this.generateDatabaseService.insertAttendanceMarksTable();
    await this.generateDatabaseService.insertAttendancesTable();
    await this.generateDatabaseService.insertDisciplinesTable();
    await this.generateDatabaseService.insertDisciplinesTeachersTable();
    await this.generateDatabaseService.insertGroupsTable();
    await this.generateDatabaseService.insertJobsTable();
    await this.generateDatabaseService.insertMarksTable();
    await this.generateDatabaseService.insertModulesTable();
    await this.generateDatabaseService.insertSemestersTable();
    await this.generateDatabaseService.insertStudentsDisciplinesTable();
    await this.generateDatabaseService.insertStudentsTable();
    await this.generateDatabaseService.insertTeachersTable();
  }
}
