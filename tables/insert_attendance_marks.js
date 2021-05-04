const options = require('../env/db.config');
const knex = require('knex')(options);

const attendanceMarks = [];

knex('attendance-marks')
  .insert(attendanceMarks)
  .then(() => console.log('attendance-marks inserted'))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });
