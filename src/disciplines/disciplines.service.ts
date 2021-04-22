import { Injectable } from '@nestjs/common';

import { KnexService } from '../knex/knex.service';

@Injectable()
export class DisciplinesService {
  constructor(private readonly knexService: KnexService) {}

  async getDisciplines() {
    const knex = this.knexService.getKnex();

    return knex.from('disciplines').select('*');
  }
}
