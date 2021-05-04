const options = require('../env/db.config');
const knex = require('knex')(options);

const attendances = [
  {
    id: '1',
    disciplineId: '1',
    attendanceName: '01.10',
    numberInList: 1,
  },
  {
    id: '2',
    disciplineId: '1',
    attendanceName: '01.20',
    numberInList: 2,
  },
  {
    id: '3',
    disciplineId: '1',
    attendanceName: '01.22',
    numberInList: 3,
  },
  {
    id: '4',
    disciplineId: '1',
    attendanceName: '01.31',
    numberInList: 4,
  },
  {
    id: '5',
    disciplineId: '2',
    attendanceName: '02.12',
    numberInList: 1,
  },
  {
    id: '6',
    disciplineId: '2',
    attendanceName: '02.20',
    numberInList: 2,
  },
  {
    id: '7',
    disciplineId: '2',
    attendanceName: '02.132',
    numberInList: 3,
  },
  {
    id: '8',
    disciplineId: '2',
    attendanceName: '02.32410',
    numberInList: 4,
  },
  {
    id: '9',
    disciplineId: '2',
    attendanceName: '02.2310',
    numberInList: 5,
  },
  {
    id: '10',
    disciplineId: '2',
    attendanceName: '02.610',
    numberInList: 6,
  },
  {
    id: '11',
    disciplineId: '2',
    attendanceName: '02.106',
    numberInList: 7,
  },
  {
    id: '12',
    disciplineId: '3',
    attendanceName: '03.103',
    numberInList: 1,
  },
  {
    id: '13',
    disciplineId: '3',
    attendanceName: '03.10',
    numberInList: 3,
  },
  {
    id: '14',
    disciplineId: '3',
    attendanceName: '03.10',
    numberInList: 3,
  },
  {
    id: '15',
    disciplineId: '3',
    attendanceName: '03.10',
    numberInList: 4,
  },
  {
    id: '16',
    disciplineId: '3',
    attendanceName: '03.10',
    numberInList: 5,
  },
  {
    id: '17',
    disciplineId: '3',
    attendanceName: '03.10',
    numberInList: 6,
  },
  {
    id: '18',
    disciplineId: '3',
    attendanceName: '03.10',
    numberInList: 7,
  },
];

knex('attendances')
  .insert(attendances)
  .then(() => console.log('attendances inserted'))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });
