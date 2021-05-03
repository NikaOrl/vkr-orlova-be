import { Module } from '@nestjs/common';
import knexConfig from '../knex/knex.config';

import { ModulesController } from './modules.controller';
import { ModulesService } from './modules.service';
import { KnexModule } from '../knex/knex.module';

@Module({
  imports: [KnexModule.register(knexConfig)],
  controllers: [ModulesController],
  providers: [ModulesService],
})
export class ModulesModule {}
