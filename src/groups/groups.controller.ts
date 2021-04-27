import { Controller, Get } from '@nestjs/common';

import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  async getGroups() {
    return this.groupsService.getGroups();
  }
}
