const options = require('../env/db.config');
const knex = require('knex')(options);

const jobs = [
  {
    id: '1',
    disciplineId: '1',
    moduleId: '1',
    numberInList: 1,
    jobValue: 'Л/р 1',
    maxPoint: 10,
    deleted: false,
  },
  {
    id: '2',
    disciplineId: '1',
    moduleId: '1',
    numberInList: 2,
    jobValue: 'Л/р 2',
    maxPoint: 20,
    deleted: false,
  },
  {
    id: '3',
    disciplineId: '1',
    moduleId: '1',
    numberInList: 3,
    jobValue: 'Л/р 3',
    maxPoint: 20,
    deleted: false,
  },
  {
    id: '4',
    disciplineId: '1',
    moduleId: '2',
    numberInList: 1,
    jobValue: 'К/р 1',
    maxPoint: 20,
    deleted: false,
  },
  {
    id: '5',
    disciplineId: '1',
    moduleId: '2',
    numberInList: 3,
    jobValue: 'Л/р 4',
    maxPoint: 30,
    deleted: false,
  },
  {
    id: '6',
    disciplineId: '1',
    moduleId: '3',
    numberInList: 1,
    jobValue: 'Л/р 5',
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
    jobValue: 'К/т',
    maxPoint: 40,
    deleted: false,
  },
  {
    id: '11',
    disciplineId: '3',
    moduleId: '5',
    numberInList: 2,
    jobValue: 'К/т 2',
    maxPoint: 40,
    deleted: false,
  },
  {
    id: '12',
    disciplineId: '3',
    moduleId: '5',
    numberInList: 3,
    jobValue: 'К/т 3',
    maxPoint: 40,
    deleted: false,
  },
  {
    id: '13',
    disciplineId: '3',
    moduleId: '5',
    numberInList: 4,
    jobValue: 'Экзамен',
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
