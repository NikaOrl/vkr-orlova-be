import { Module } from '@nestjs/common';

import { KnexModule } from '../knex/knex.module';
import { GroupsService } from './groups.service';

import knexConfig from '../knex/knex.config';

@Module({
  imports: [KnexModule.register(knexConfig)],
  providers: [GroupsService],
  exports: [GroupsService],
})
export class GroupsModule {}
