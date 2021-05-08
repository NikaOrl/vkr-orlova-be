const options = require('../env/db.config');
const knex = require('knex')(options);

const studentsDisciplines = [
  {
    id: '1',
    teacherId: '1',
    disciplineId: '1',
  },
  {
    id: '2',
    teacherId: '1',
    disciplineId: '2',
  },
  {
    id: '3',
    teacherId: '2',
    disciplineId: '2',
  },
  {
    id: '4',
    teacherId: '2',
    disciplineId: '3',
  },
  {
    id: '5',
    teacherId: '3',
    disciplineId: '1',
  },
  {
    id: '6',
    teacherId: '4',
    disciplineId: '1',
  },
  {
    id: '7',
    teacherId: '4',
    disciplineId: '3',
  },
  {
    id: '8',
    teacherId: '1',
    disciplineId: '4',
  },
  {
    id: '9',
    teacherId: '1',
    disciplineId: '5',
  },
  {
    id: '10',
    teacherId: '2',
    disciplineId: '6',
  },
  {
    id: '11',
    teacherId: '2',
    disciplineId: '7',
  },
  {
    id: '12',
    teacherId: '3',
    disciplineId: '8',
  },
  {
    id: '13',
    teacherId: '4',
    disciplineId: '9',
  },
  {
    id: '14',
    teacherId: '4',
    disciplineId: '7',
  },
];

knex('disciplines-teachers')
  .insert(studentsDisciplines)
  .then(() => console.log('disciplines-teachers inserted'))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });
