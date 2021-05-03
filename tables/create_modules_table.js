const options = require('../env/db.config');
const knex = require('knex')(options);

knex.schema
  .createTable('modules', (table) => {
    table.uuid('id').primary();
    table.string('moduleName');
    table.integer('numberInList');
    table.boolean('deleted').defaultTo(false);
  })
  .then(() => console.log('table modules created'))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });
