const options = require('../env/db.config');
const knex = require('knex')(options);

knex.schema
  .createTable('attendance-marks', (table) => {
    table.uuid('id').primary();
    table.string('studentId');
    table.string('attendanceId');
    table.boolean('attendanceMarkValue');
    table.boolean('deleted').defaultTo(false);
  })
  .then(() => console.log('table attendance-marks created'))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });
