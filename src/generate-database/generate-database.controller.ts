import { Controller, Get } from '@nestjs/common';

import { GenerateDatabaseService } from './generate-database.service';

import { ResultStatus } from '../../common/types/ResultStatus';

@Controller('generate-database')
export class GenerateDatabaseController {
  constructor(
    private readonly generateDatabaseService: GenerateDatabaseService,
  ) {}

  @Get('create')
  async createTables(): Promise<ResultStatus> {
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

    return {
      status: 'success',
    };
  }

  @Get('insert')
  async insertDataToTables(): Promise<ResultStatus> {
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

    return {
      status: 'success',
    };
  }
}
