const options = require('../env/db.config');
const knex = require('knex')(options);

knex.schema
  .createTable('disciplines', (table) => {
    table.uuid('id').primary();
    table.uuid('semesterId');
    table.string('disciplineValue');
    table.integer('attendanceWeight').defaultTo(1);
    table.boolean('countWithAttendance').defaultTo(true);
  })
  .then(() => console.log('table disciplines created'))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });
