import { Injectable } from '@nestjs/common';

import { KnexService } from '../knex/knex.service';

@Injectable()
export class GroupsService {
  constructor(private readonly knexService: KnexService) {}

  async getGroups() {
    const knex = this.knexService.getKnex();

    return knex.from('groups').select('*');
  }
}
