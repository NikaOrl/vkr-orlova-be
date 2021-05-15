import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFile, UploadedFiles,
  UseInterceptors
} from "@nestjs/common";
import { Express, Response } from 'express';

import { GroupsService } from './groups.service';

import { GroupDB } from './groups.interface';
import { ResultStatus } from '../../common/types/ResultStatus';
import { CreateGroupWithStudentsDto } from './dto/create-group-with-students.dto';
import { UpdateGroupWithStudentsDto } from './dto/update-group-with-students.dto';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  async getGroups(): Promise<GroupDB[]> {
    return this.groupsService.getGroups();
  }

  @Get(':groupId')
  async getGroupWithStudents(
    @Param('groupId') groupId: string,
  ): Promise<GroupDB> {
    return this.groupsService.getGroupWithStudents(groupId);
  }

  @Post()
  async createGroupWithStudents(
    @Body()
    createGroupWithStudentsDto: CreateGroupWithStudentsDto,
  ): Promise<ResultStatus> {
    await this.groupsService.createGroupWithStudents(
      createGroupWithStudentsDto,
    );

    return {
      status: 'success',
    };
  }

  @Put(':groupId')
  async updateGroupWithStudents(
    @Param('groupId') groupId: string,
    @Body()
    updateGroupWithStudentsDto: UpdateGroupWithStudentsDto,
  ): Promise<ResultStatus> {
    await this.groupsService.updateGroupWithStudents(
      groupId,
      updateGroupWithStudentsDto,
    );

    return {
      status: 'success',
    };
  }

  @Get(':groupId/table')
  async getStudentsByGroupTable(
    @Param('groupId') groupId: string,
    @Res() res: Response,
  ): Promise<void> {
    const {
      stream,
      groupNumber,
    } = await this.groupsService.getStudentsByGroupTable(groupId);

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=Students_${groupNumber}.xlsx`,
    );
    res.setHeader('Content-Length', stream.length);
    res.send(stream);
  }

  @Post(':groupId/table')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    await this.groupsService.uploadStudentsFromFile(file);
  }
}
