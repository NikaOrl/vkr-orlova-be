import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { KnexModule } from '../knex/knex.module';

import knexConfig from '../knex/knex.config';

@Module({
  imports: [KnexModule.register(knexConfig)],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
