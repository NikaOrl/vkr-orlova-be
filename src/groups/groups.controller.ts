import { Controller, Get } from '@nestjs/common';

@Controller('groups')
export class GroupsController {
  @Get()
  getGroups(): string {
    return 'groups';
  }
}
