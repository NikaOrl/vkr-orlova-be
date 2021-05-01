const options = require('../env/db.config');
const knex = require('knex')(options);

knex.schema
  .createTable('disciplines', (table) => {
    table.uuid('id').primary();
    table.string('disciplineValue');
    table.uuid('semesterId');
  })
  .then(() => console.log('table disciplines created'))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });
