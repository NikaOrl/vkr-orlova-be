const options = require('../env/db.config');
const knex = require('knex')(options);

const disciplines = [
  {
    id: '1',
    semesterName: 'весна 2020',
  },
  {
    id: '2',
    semesterName: 'осень 2021',
  },
  {
    id: '3',
    semesterName: 'осень 2020',
  },
];

knex('semesters')
  .insert(disciplines)
  .then(() => console.log('disciplines inserted'))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });
