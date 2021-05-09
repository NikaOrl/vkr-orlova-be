import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

import { GroupsService } from './groups.service';

import { GroupDB } from './groups.interface';
import { ResultStatus } from '../../common/types/ResultStatus';
import { CreateGroupWithStudentsDto } from './dto/create-group-with-students.dto';
import { UpdateGroupWithStudentsDto } from './dto/update-group-with-students.dto';

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
}
