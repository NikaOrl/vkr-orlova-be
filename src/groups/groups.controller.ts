import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

import { GroupsService } from './groups.service';

import { GroupDB } from './groups.interface';
import { ResultStatus } from '../../common/types/ResultStatus';
import { UpdateGroupDto } from './dto/update-group.dto';
import { CreateGroupWithStudentsDto } from './dto/create-group-with-students.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  async getGroups(): Promise<GroupDB[]> {
    return this.groupsService.getGroups();
  }

  @Get(':groupId')
  async getGroupById(@Param('groupId') groupId: string): Promise<GroupDB> {
    return this.groupsService.getGroupById(groupId);
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
  async updateGroup(
    @Param('groupId') groupId: string,
    @Body()
    updateGroupDto: UpdateGroupDto,
  ): Promise<ResultStatus> {
    await this.groupsService.updateGroup(groupId, updateGroupDto);

    return {
      status: 'success',
    };
  }
}
