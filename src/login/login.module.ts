import { Module } from '@nestjs/common';
import { KnexModule } from '../knex/knex.module';
import knexConfig from '../knex/knex.config';
import { LoginService } from './login.service';

@Module({
  imports: [KnexModule.register(knexConfig)],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule {}
