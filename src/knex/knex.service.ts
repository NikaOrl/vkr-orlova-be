import { Inject, Injectable, Logger } from '@nestjs/common';
import { Knex, knex } from 'knex';

import { KnexOptions } from './knex-options.interface';
// import { CONFIG_OPTIONS } from './constants';

interface IKnexService {
  getKnex();
}

@Injectable()
export class KnexService implements IKnexService {
  private readonly logger: Logger;
  private _knexConnection: any;
  constructor(@Inject('CONFIG_OPTIONS') private _KnexOptions: KnexOptions) {
    this.logger = new Logger('NestKnexService');
    this.logger.log(`Options: ${JSON.stringify(this._KnexOptions)}`);
  }

  getKnex(): Knex {
    if (!this._knexConnection) {
      this._knexConnection = knex(this._KnexOptions);
    }
    return this._knexConnection;
  }
}
