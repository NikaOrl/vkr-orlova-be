import { KnexOptions } from './knex-options.interface';

const config: KnexOptions = {
  client: 'mysql2',
  connection: {
    host: 'db',
    user: 'user',
    password: 'password',
    database: 'db',
    // 'default-character-set': 'utf8mb4',
    // 'character-set-server': 'utf8mb4',
  },
};

export default config;
