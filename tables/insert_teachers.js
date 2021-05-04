const bcrypt = require('bcryptjs');

const options = require('../env/db.config');
const knex = require('knex')(options);

const salt = bcrypt.genSaltSync();

const DEFAULT_PASSWORD = '123';

const teachers = [
  {
    id: '1',
    firstName: 'Иван',
    lastName: 'Иванов',
    email: 'ivan@teacher.com',
    password: bcrypt.hashSync(DEFAULT_PASSWORD, salt),
    isAdmin: true,
  },
  {
    id: '2',
    firstName: 'Петр',
    lastName: 'Петров',
    email: 'petr@teacher.com',
    password: bcrypt.hashSync(DEFAULT_PASSWORD, salt),
    isAdmin: false,
  },
  {
    id: '3',
    firstName: 'Василий',
    lastName: 'Васильев',
    email: 'vasia@teacher.com',
    password: bcrypt.hashSync(DEFAULT_PASSWORD, salt),
    isAdmin: false,
  },
  {
    id: '4',
    firstName: 'Сергей',
    lastName: 'Сергеев',
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
