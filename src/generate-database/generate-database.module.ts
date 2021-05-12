import { Module } from '@nestjs/common';

import { GenerateDatabaseService } from './generate-database.service';
import { KnexModule } from '../knex/knex.module';
import { GenerateDatabaseController } from './generate-database.controller';

import knexConfig from '../knex/knex.config';

@Module({
  imports: [KnexModule.register(knexConfig)],
  providers: [GenerateDatabaseService],
  controllers: [GenerateDatabaseController],
})
export class GenerateDatabaseModule {}
