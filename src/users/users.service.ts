import { Injectable } from '@nestjs/common';

import { KnexService } from '../knex/knex.service';

export type User = any;

// Учителя
@Injectable()
export class UsersService {
  constructor(private readonly knexService: KnexService) {}

  async findOne(email: string): Promise<User | undefined> {
    const knex = this.knexService.getKnex();

    return knex('teachers').where({ email }).first();
  }
}
