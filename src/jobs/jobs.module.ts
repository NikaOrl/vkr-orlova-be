import { Module } from '@nestjs/common';
import { KnexModule } from '../knex/knex.module';
import knexConfig from '../knex/knex.config';
import { JobsService } from './jobs.service';

@Module({
  imports: [KnexModule.register(knexConfig)],
  providers: [JobsService],
  exports: [JobsService],
})
export class JobsModule {}
