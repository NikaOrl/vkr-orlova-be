import { Injectable } from '@nestjs/common';

import { KnexService } from '../knex/knex.service';

import { GroupDB } from './groups.interface';

@Injectable()
export class GroupsService {
  constructor(private readonly knexService: KnexService) {}

  async getGroups(): Promise<GroupDB[]> {
    const knex = this.knexService.getKnex();

    return knex<GroupDB>('groups').select('*');
  }

  async getGroupsByIds(ids: string[]): Promise<GroupDB[]> {
    const knex = this.knexService.getKnex();

    return knex<GroupDB>('groups').whereIn('id', ids).select('*');
  }
}
