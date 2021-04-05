import { DynamicModule, Module } from '@nestjs/common';
import { KnexService } from './knex.service';
import { KnexOptions } from './knex-options.interface';

@Module({})
export class KnexModule {
  static register(options: KnexOptions): DynamicModule {
    return {
      module: KnexModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        KnexService,
      ],
      exports: [KnexService],
    };
  }
}
