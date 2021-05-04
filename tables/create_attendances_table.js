const options = require('../env/db.config');
const knex = require('knex')(options);

knex.schema
  .createTable('attendances', (table) => {
    table.uuid('id').primary();
    table.string('disciplineId');
    table.string('attendanceName');
    table.integer('numberInList');
    table.boolean('deleted').defaultTo(false);
  })
  .then(() => console.log('table attendances created'))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });
