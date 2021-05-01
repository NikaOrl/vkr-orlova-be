const options = require('../env/db.config');
const knex = require('knex')(options);

knex.schema
  .createTable('disciplines-teachers', (table) => {
    table.increments('id');
    table.integer('disciplineId');
    table.integer('teacherId');
  })
  .then(() => console.log('table disciplines-teachers created'))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });
