import { Injectable } from '@nestjs/common';

import { KnexService } from '../knex/knex.service';

import { getUser, comparePass, encodeToken } from './auth.helper';

@Injectable()
export class LoginService {
  constructor(private readonly knexService: KnexService) {}

  async login(email, password) {
    const knex = this.knexService.getKnex();

    const user = await getUser(knex, email);

    const isMatch = await comparePass(password, user.password);

    if (!isMatch) {
      throw new Error('bad pass silly money');
    }

    const token = encodeToken(user);

    return {
      token,
      isAdmin: user.isAdmin,
    };
  }
}
