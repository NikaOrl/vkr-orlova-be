import { Module } from '@nestjs/common';
import knexConfig from '../knex/knex.config';

import { ModulesController } from './modules.controller';
import { ModulesService } from './modules.service';
import { KnexModule } from '../knex/knex.module';
import { JobsModule } from '../jobs/jobs.module';

@Module({
  imports: [KnexModule.register(knexConfig), JobsModule],
  controllers: [ModulesController],
  providers: [ModulesService],
  exports: [ModulesService],
})
export class ModulesModule {}
