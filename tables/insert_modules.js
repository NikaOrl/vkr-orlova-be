const options = require('../env/db.config');
const knex = require('knex')(options);

const modules = [
  {
    id: '1',
    moduleName: 'MODULE1',
    numberInList: 1,
  },
  {
    id: '2',
    moduleName: 'MODULE2',
    numberInList: 2,
  },
  {
    id: '3',
    moduleName: 'MODULE3',
    numberInList: 3,
  },
  {
    id: '4',
    moduleName: 'MODULE4',
    numberInList: 4,
  },
  {
    id: '5',
    moduleName: 'MODULE5',
    numberInList: 5,
  },
];

knex('modules')
  .insert(modules)
  .then(() => console.log('groups inserted'))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });
