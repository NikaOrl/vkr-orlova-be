const options = require('../env/db.config');
const knex = require('knex')(options);

knex.schema
  .createTable('jobs', (table) => {
    table.uuid('id').primary();
    table.uuid('disciplineId');
    table.uuid('moduleId');
    table.integer('numberInList');
    table.string('jobValue');
    table.integer('maxPoint').defaultTo(0);
    table.boolean('deleted').defaultTo(false);
  })
  .then(() => console.log('table jobs created'))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });
