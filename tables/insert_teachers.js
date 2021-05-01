const bcrypt = require('bcryptjs');

const options = require('../env/db.config');
const knex = require('knex')(options);

const salt = bcrypt.genSaltSync();

const DEFAULT_PASSWORD = '123';

const teachers = [
  {
    id: '1',
    firstName: 'Ivan',
    lastName: 'Ivanov',
    email: 'ivan@teacher.com',
    password: bcrypt.hashSync(DEFAULT_PASSWORD, salt),
    isAdmin: true,
  },
  {
    id: '2',
    firstName: 'Petr',
    lastName: 'Petrov',
    email: 'petr@teacher.com',
    password: bcrypt.hashSync(DEFAULT_PASSWORD, salt),
    isAdmin: false,
  },
  {
    id: '3',
    firstName: 'Vasia',
    lastName: 'Vasiliev',
    email: 'vasia@teacher.com',
    password: bcrypt.hashSync(DEFAULT_PASSWORD, salt),
    isAdmin: false,
  },
  {
    id: '4',
    firstName: 'Sergei',
    lastName: 'Sergeev',
    email: 'serg@teacher.com',
    password: bcrypt.hashSync(DEFAULT_PASSWORD, salt),
    isAdmin: false,
  },
];

knex('teachers')
  .insert(teachers)
  .then(() => console.log('teachers inserted'))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });
