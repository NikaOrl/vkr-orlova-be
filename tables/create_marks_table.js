const options = require('../env/db.config');
const knex = require('knex')(options);

knex.schema
  .createTable('marks', (table) => {
    table.increments('id');
    table.integer('studentId');
    table.integer('jobId');
    table.string('markValue');
    table.boolean('deleted').defaultTo(false);
  })
  .then(() => console.log('table marks created'))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });
