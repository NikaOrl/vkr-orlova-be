const options = require('../env/db.config');
const knex = require('knex')(options);

const disciplines = [
  {
    id: '1',
    disciplineValue: 'ООП',
    semesterId: '1',
  },
  {
    id: '2',
    disciplineValue: 'Веб-технологии',
    semesterId: '1',
  },
  {
    id: '3',
    disciplineValue: 'Компьютерная Графика',
    semesterId: '1',
  },
  {
    id: '4',
    disciplineValue: 'ООП',
    semesterId: '2',
  },
  {
    id: '5',
    disciplineValue: 'Веб-технологии',
    semesterId: '2',
  },
  {
    id: '6',
    disciplineValue: 'Компьютерная Графика',
    semesterId: '2',
  },
  {
    id: '7',
    disciplineValue: 'ООП',
    semesterId: '3',
  },
  {
    id: '8',
    disciplineValue: 'Веб-технологии',
    semesterId: '3',
  },
  {
    id: '9',
    disciplineValue: 'Компьютерная Графика',
    semesterId: '3',
  },
];

knex('disciplines')
  .insert(disciplines)
  .then(() => console.log('disciplines inserted'))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });
