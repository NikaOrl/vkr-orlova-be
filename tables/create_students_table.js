const options = require('../env/db.config');
const knex = require('knex')(options);

knex.schema
  .createTable('students', (table) => {
    table.increments('id');
    table.string('firstName');
    table.string('lastName');
    table.integer('numberInList');
    table.string('email');
    table.integer('groupId');
    table.boolean('headStudent').defaultTo(false);
    table.boolean('deleted').defaultTo(false);
  })
  .then(() => console.log('table students created'))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });
