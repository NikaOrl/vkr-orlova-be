const options = require('../env/db.config');
const knex = require('knex')(options);

const jobs = [
  {
    id: '1',
    disciplineId: '1',
    moduleId: '1',
    numberInList: 1,
    jobValue: 'laba1',
    maxPoint: 10,
    deleted: false,
  },
  {
    id: '2',
    disciplineId: '1',
    moduleId: '1',
    numberInList: 2,
    jobValue: 'laba2',
    maxPoint: 20,
    deleted: false,
  },
  {
    id: '3',
    disciplineId: '1',
    moduleId: '1',
    numberInList: 3,
    jobValue: 'laba3',
    maxPoint: 20,
    deleted: false,
  },
  {
    id: '4',
    disciplineId: '1',
    moduleId: '2',
    numberInList: 1,
    jobValue: 'laba4',
    maxPoint: 20,
    deleted: false,
  },
  {
    id: '5',
    disciplineId: '1',
    moduleId: '2',
    numberInList: 3,
    jobValue: 'laba5',
    maxPoint: 30,
    deleted: false,
  },
  {
    id: '6',
    disciplineId: '1',
    moduleId: '3',
    numberInList: 1,
    jobValue: 'laba6',
    maxPoint: 30,
    deleted: false,
  },
  {
    id: '7',
    disciplineId: '2',
    moduleId: '3',
    numberInList: 2,
    jobValue: '02/02',
    maxPoint: 30,
    deleted: false,
  },
  {
    id: '8',
    disciplineId: '2',
    moduleId: '3',
    numberInList: 4,
    jobValue: '12/02',
    maxPoint: 30,
    deleted: false,
  },
  {
    id: '9',
    disciplineId: '2',
    moduleId: '3',
    numberInList: 4,
    jobValue: '22/02',
    maxPoint: 40,
    deleted: false,
  },
  {
    id: '10',
    disciplineId: '3',
    moduleId: '5',
    numberInList: 1,
    jobValue: 'k/r',
    maxPoint: 40,
    deleted: false,
  },
  {
    id: '11',
    disciplineId: '3',
    moduleId: '5',
    numberInList: 2,
    jobValue: 'k/r',
    maxPoint: 40,
    deleted: false,
  },
  {
    id: '12',
    disciplineId: '3',
    moduleId: '5',
    numberInList: 3,
    jobValue: 'k/r3',
    maxPoint: 40,
    deleted: false,
  },
  {
    id: '13',
    disciplineId: '3',
    moduleId: '5',
    numberInList: 4,
    jobValue: 'ekz',
    maxPoint: 40,
    deleted: false,
  },
];

knex('jobs')
  .insert(jobs)
  .then(() => console.log('jobs inserted'))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });
