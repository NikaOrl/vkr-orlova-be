import { Module } from '@nestjs/common';

import { SemestersService } from './semesters.service';
import { KnexModule } from '../knex/knex.module';
import { SemestersController } from './semesters.controller';

import knexConfig from '../knex/knex.config';

@Module({
  imports: [KnexModule.register(knexConfig)],
  providers: [SemestersService],
  controllers: [SemestersController],
  exports: [SemestersService],
})
export class SemestersModule {}
