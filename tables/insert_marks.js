const options = require('../env/db.config');
const knex = require('knex')(options);

const marks = [
  {
    id: '1',
    studentId: '1',
    jobId: 1,
    markValue: '2',
    deleted: 0,
  },
  {
    id: '2',
    studentId: '2',
    jobId: 1,
    markValue: '3',
    deleted: 0,
  },
  {
    id: '3',
    studentId: '3',
    jobId: 1,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '4',
    studentId: '1',
    jobId: 2,
    markValue: '3',
    deleted: 0,
  },
  {
    id: '5',
    studentId: '1',
    jobId: 3,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '6',
    studentId: '1',
    jobId: 4,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '7',
    studentId: '1',
    jobId: 5,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '8',
    studentId: '2',
    jobId: 3,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '9',
    studentId: '1',
    jobId: 6,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '10',
    studentId: '2',
    jobId: 2,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '11',
    studentId: '2',
    jobId: 4,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '12',
    studentId: '2',
    jobId: 5,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '13',
    studentId: '2',
    jobId: 6,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '14',
    studentId: '3',
    jobId: 2,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '15',
    studentId: '3',
    jobId: 4,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '16',
    studentId: '3',
    jobId: 6,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '17',
    studentId: '4',
    jobId: 1,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '18',
    studentId: '4',
    jobId: 2,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '19',
    studentId: '3',
    jobId: 3,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '20',
    studentId: '3',
    jobId: 5,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '21',
    studentId: '4',
    jobId: 3,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '22',
    studentId: '4',
    jobId: 4,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '23',
    studentId: '4',
    jobId: 5,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '24',
    studentId: '4',
    jobId: 6,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '25',
    studentId: '5',
    jobId: 1,
    markValue: '3',
    deleted: 0,
  },
  {
    id: '26',
    studentId: '5',
    jobId: 2,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '27',
    studentId: '5',
    jobId: 3,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '28',
    studentId: '5',
    jobId: 4,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '29',
    studentId: '5',
    jobId: 5,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '30',
    studentId: '5',
    jobId: 6,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '31',
    studentId: '6',
    jobId: 1,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '32',
    studentId: '6',
    jobId: 2,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '33',
    studentId: '6',
    jobId: 3,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '34',
    studentId: '6',
    jobId: 4,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '35',
    studentId: '6',
    jobId: 5,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '36',
    studentId: '6',
    jobId: 6,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '37',
    studentId: '7',
    jobId: 1,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '38',
    studentId: '7',
    jobId: 2,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '39',
    studentId: '7',
    jobId: 3,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '40',
    studentId: '7',
    jobId: 4,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '41',
    studentId: '7',
    jobId: 5,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '42',
    studentId: '7',
    jobId: 6,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '43',
    studentId: '8',
    jobId: 1,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '44',
    studentId: '8',
    jobId: 2,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '45',
    studentId: '8',
    jobId: 3,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '46',
    studentId: '8',
    jobId: 4,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '47',
    studentId: '8',
    jobId: 5,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '48',
    studentId: '8',
    jobId: 6,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '49',
    studentId: '9',
    jobId: 1,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '50',
    studentId: '9',
    jobId: 2,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '51',
    studentId: '9',
    jobId: 3,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '52',
    studentId: '9',
    jobId: 4,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '53',
    studentId: '9',
    jobId: 5,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '54',
    studentId: '9',
    jobId: 6,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '55',
    studentId: '10',
    jobId: 1,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '56',
    studentId: '10',
    jobId: 2,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '57',
    studentId: '10',
    jobId: 3,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '58',
    studentId: '10',
    jobId: 4,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '59',
    studentId: '10',
    jobId: 5,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '60',
    studentId: '10',
    jobId: 6,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '61',
    studentId: '11',
    jobId: 1,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '62',
    studentId: '11',
    jobId: 2,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '63',
    studentId: '11',
    jobId: 3,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '64',
    studentId: '11',
    jobId: 4,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '65',
    studentId: '11',
    jobId: 5,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '66',
    studentId: '11',
    jobId: 6,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '67',
    studentId: '12',
    jobId: 1,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '68',
    studentId: '12',
    jobId: 2,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '69',
    studentId: '12',
    jobId: 3,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '70',
    studentId: '12',
    jobId: 4,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '71',
    studentId: '12',
    jobId: 5,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '72',
    studentId: '12',
    jobId: 6,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '73',
    studentId: '13',
    jobId: 1,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '74',
    studentId: '13',
    jobId: 2,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '75',
    studentId: '13',
    jobId: 3,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '76',
    studentId: '13',
    jobId: 4,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '77',
    studentId: '13',
    jobId: 5,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '78',
    studentId: '13',
    jobId: 6,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '79',
    studentId: '14',
    jobId: 1,
    markValue: '2',
    deleted: 0,
  },
  {
    id: '80',
    studentId: '14',
    jobId: 2,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '81',
    studentId: '14',
    jobId: 3,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '82',
    studentId: '14',
    jobId: 4,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '83',
    studentId: '14',
    jobId: 5,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '84',
    studentId: '14',
    jobId: 6,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '85',
    studentId: '15',
    jobId: 1,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '86',
    studentId: '15',
    jobId: 2,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '87',
    studentId: '15',
    jobId: 3,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '88',
    studentId: '15',
    jobId: 4,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '89',
    studentId: '15',
    jobId: 5,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '90',
    studentId: '15',
    jobId: 6,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '91',
    studentId: '16',
    jobId: 1,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '92',
    studentId: '16',
    jobId: 2,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '93',
    studentId: '16',
    jobId: 3,
    markValue: '3',
    deleted: 0,
  },
  {
    id: '94',
    studentId: '16',
    jobId: 4,
    markValue: '3',
    deleted: 0,
  },
  {
    id: '95',
    studentId: '16',
    jobId: 5,
    markValue: '3',
    deleted: 0,
  },
  {
    id: '96',
    studentId: '16',
    jobId: 6,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '97',
    studentId: '17',
    jobId: 1,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '98',
    studentId: '17',
    jobId: 2,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '99',
    studentId: '17',
    jobId: 3,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '100',
    studentId: '17',
    jobId: 4,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '101',
    studentId: '17',
    jobId: 5,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '102',
    studentId: '17',
    jobId: 6,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '103',
    studentId: '18',
    jobId: 1,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '104',
    studentId: '18',
    jobId: 2,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '105',
    studentId: '18',
    jobId: 3,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '106',
    studentId: '18',
    jobId: 4,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '107',
    studentId: '18',
    jobId: 5,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '108',
    studentId: '18',
    jobId: 6,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '109',
    studentId: '19',
    jobId: 1,
    markValue: '3',
    deleted: 0,
  },
  {
    id: '110',
    studentId: '19',
    jobId: 2,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '111',
    studentId: '19',
    jobId: 3,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '112',
    studentId: '19',
    jobId: 4,
    markValue: '3',
    deleted: 0,
  },
  {
    id: '113',
    studentId: '19',
    jobId: 5,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '114',
    studentId: '19',
    jobId: 6,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '115',
    studentId: '20',
    jobId: 1,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '116',
    studentId: '20',
    jobId: 2,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '117',
    studentId: '20',
    jobId: 3,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '118',
    studentId: '20',
    jobId: 4,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '119',
    studentId: '20',
    jobId: 5,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '120',
    studentId: '20',
    jobId: 6,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '121',
    studentId: '21',
    jobId: 1,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '122',
    studentId: '21',
    jobId: 2,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '123',
    studentId: '21',
    jobId: 3,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '124',
    studentId: '21',
    jobId: 4,
    markValue: '3',
    deleted: 0,
  },
  {
    id: '125',
    studentId: '21',
    jobId: 5,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '126',
    studentId: '21',
    jobId: 6,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '127',
    studentId: '22',
    jobId: 1,
    markValue: '3',
    deleted: 0,
  },
  {
    id: '128',
    studentId: '22',
    jobId: 2,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '129',
    studentId: '22',
    jobId: 3,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '130',
    studentId: '22',
    jobId: 4,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '131',
    studentId: '22',
    jobId: 5,
    markValue: '3',
    deleted: 0,
  },
  {
    id: '132',
    studentId: '22',
    jobId: 6,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '133',
    studentId: '23',
    jobId: 1,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '134',
    studentId: '23',
    jobId: 2,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '135',
    studentId: '23',
    jobId: 3,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '136',
    studentId: '23',
    jobId: 4,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '137',
    studentId: '23',
    jobId: 5,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '138',
    studentId: '23',
    jobId: 6,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '139',
    studentId: '24',
    jobId: 1,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '140',
    studentId: '24',
    jobId: 2,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '141',
    studentId: '24',
    jobId: 3,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '142',
    studentId: '24',
    jobId: 4,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '143',
    studentId: '24',
    jobId: 5,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '144',
    studentId: '24',
    jobId: 6,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '145',
    studentId: '25',
    jobId: 1,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '146',
    studentId: '25',
    jobId: 2,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '147',
    studentId: '25',
    jobId: 3,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '148',
    studentId: '25',
    jobId: 4,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '149',
    studentId: '25',
    jobId: 5,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '150',
    studentId: '25',
    jobId: 6,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '151',
    studentId: '26',
    jobId: 1,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '152',
    studentId: '26',
    jobId: 2,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '153',
    studentId: '26',
    jobId: 3,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '154',
    studentId: '26',
    jobId: 4,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '155',
    studentId: '26',
    jobId: 5,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '156',
    studentId: '26',
    jobId: 6,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '157',
    studentId: '27',
    jobId: 1,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '158',
    studentId: '27',
    jobId: 2,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '159',
    studentId: '27',
    jobId: 3,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '160',
    studentId: '27',
    jobId: 4,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '161',
    studentId: '27',
    jobId: 5,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '162',
    studentId: '27',
    jobId: 6,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '163',
    studentId: '1',
    jobId: 7,
    markValue: '+',
    deleted: 0,
  },
  {
    id: '164',
    studentId: '1',
    jobId: 8,
    markValue: '+',
    deleted: 0,
  },
  {
    id: '165',
    studentId: '2',
    jobId: 7,
    markValue: '+',
    deleted: 0,
  },
  {
    id: '166',
    studentId: '2',
    jobId: 8,
    markValue: '+',
    deleted: 0,
  },
  {
    id: '167',
    studentId: '2',
    jobId: 9,
    markValue: '+',
    deleted: 0,
  },
  {
    id: '168',
    studentId: '3',
    jobId: 7,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '169',
    studentId: '1',
    jobId: 9,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '170',
    studentId: '3',
    jobId: 8,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '171',
    studentId: '3',
    jobId: 9,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '172',
    studentId: '4',
    jobId: 7,
    markValue: '+',
    deleted: 0,
  },
  {
    id: '173',
    studentId: '4',
    jobId: 8,
    markValue: '+',
    deleted: 0,
  },
  {
    id: '174',
    studentId: '5',
    jobId: 9,
    markValue: '+',
    deleted: 0,
  },
  {
    id: '175',
    studentId: '6',
    jobId: 7,
    markValue: '+',
    deleted: 0,
  },
  {
    id: '176',
    studentId: '5',
    jobId: 7,
    markValue: '+',
    deleted: 0,
  },
  {
    id: '177',
    studentId: '4',
    jobId: 9,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '178',
    studentId: '6',
    jobId: 8,
    markValue: '+',
    deleted: 0,
  },
  {
    id: '179',
    studentId: '5',
    jobId: 8,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '180',
    studentId: '6',
    jobId: 9,
    markValue: '+',
    deleted: 0,
  },
  {
    id: '181',
    studentId: '7',
    jobId: 7,
    markValue: '+',
    deleted: 0,
  },
  {
    id: '182',
    studentId: '7',
    jobId: 8,
    markValue: '+',
    deleted: 0,
  },
  {
    id: '183',
    studentId: '7',
    jobId: 9,
    markValue: '+',
    deleted: 0,
  },
  {
    id: '184',
    studentId: '8',
    jobId: 7,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '185',
    studentId: '8',
    jobId: 8,
    markValue: '+',
    deleted: 0,
  },
  {
    id: '186',
    studentId: '8',
    jobId: 9,
    markValue: '+',
    deleted: 0,
  },
  {
    id: '187',
    studentId: '9',
    jobId: 7,
    markValue: '-+',
    deleted: 0,
  },
  {
    id: '188',
    studentId: '9',
    jobId: 8,
    markValue: '+',
    deleted: 0,
  },
  {
    id: '189',
    studentId: '9',
    jobId: 9,
    markValue: '+',
    deleted: 0,
  },
  {
    id: '190',
    studentId: '10',
    jobId: 7,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '191',
    studentId: '10',
    jobId: 8,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '192',
    studentId: '10',
    jobId: 9,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '193',
    studentId: '11',
    jobId: 7,
    markValue: '+',
    deleted: 0,
  },
  {
    id: '194',
    studentId: '11',
    jobId: 8,
    markValue: '+',
    deleted: 0,
  },
  {
    id: '195',
    studentId: '11',
    jobId: 9,
    markValue: '+',
    deleted: 0,
  },
  {
    id: '196',
    studentId: '12',
    jobId: 7,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '197',
    studentId: '12',
    jobId: 8,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '198',
    studentId: '12',
    jobId: 9,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '199',
    studentId: '13',
    jobId: 7,
    markValue: '+',
    deleted: 0,
  },
  {
    id: '200',
    studentId: '13',
    jobId: 8,
    markValue: '+',
    deleted: 0,
  },
  {
    id: '201',
    studentId: '13',
    jobId: 9,
    markValue: '+',
    deleted: 0,
  },
  {
    id: '202',
    studentId: '14',
    jobId: 7,
    markValue: '+',
    deleted: 0,
  },
  {
    id: '203',
    studentId: '14',
    jobId: 8,
    markValue: '+',
    deleted: 0,
  },
  {
    id: '204',
    studentId: '14',
    jobId: 9,
    markValue: '+',
    deleted: 0,
  },
  {
    id: '205',
    studentId: '15',
    jobId: 7,
    markValue: '+',
    deleted: 0,
  },
  {
    id: '206',
    studentId: '15',
    jobId: 8,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '207',
    studentId: '15',
    jobId: 9,
    markValue: '+',
    deleted: 0,
  },
  {
    id: '208',
    studentId: '16',
    jobId: 7,
    markValue: '+',
    deleted: 0,
  },
  {
    id: '209',
    studentId: '16',
    jobId: 8,
    markValue: '+',
    deleted: 0,
  },
  {
    id: '210',
    studentId: '16',
    jobId: 9,
    markValue: '+',
    deleted: 0,
  },
  {
    id: '211',
    studentId: '17',
    jobId: 7,
    markValue: '+',
    deleted: 0,
  },
  {
    id: '212',
    studentId: '17',
    jobId: 8,
    markValue: '+',
    deleted: 0,
  },
  {
    id: '213',
    studentId: '17',
    jobId: 9,
    markValue: '+',
    deleted: 0,
  },
  {
    id: '214',
    studentId: '18',
    jobId: 7,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '215',
    studentId: '18',
    jobId: 8,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '216',
    studentId: '18',
    jobId: 9,
    markValue: '+',
    deleted: 0,
  },
  {
    id: '217',
    studentId: '19',
    jobId: 10,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '218',
    studentId: '19',
    jobId: 11,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '219',
    studentId: '19',
    jobId: 12,
    markValue: '3',
    deleted: 0,
  },
  {
    id: '220',
    studentId: '19',
    jobId: 13,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '221',
    studentId: '20',
    jobId: 10,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '222',
    studentId: '20',
    jobId: 11,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '223',
    studentId: '20',
    jobId: 12,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '224',
    studentId: '20',
    jobId: 13,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '225',
    studentId: '21',
    jobId: 10,
    markValue: '3',
    deleted: 0,
  },
  {
    id: '226',
    studentId: '21',
    jobId: 11,
    markValue: '2',
    deleted: 0,
  },
  {
    id: '227',
    studentId: '21',
    jobId: 12,
    markValue: '3',
    deleted: 0,
  },
  {
    id: '228',
    studentId: '21',
    jobId: 13,
    markValue: '3',
    deleted: 0,
  },
  {
    id: '229',
    studentId: '22',
    jobId: 11,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '230',
    studentId: '22',
    jobId: 13,
    markValue: '3',
    deleted: 0,
  },
  {
    id: '231',
    studentId: '22',
    jobId: 12,
    markValue: '2',
    deleted: 0,
  },
  {
    id: '232',
    studentId: '23',
    jobId: 10,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '233',
    studentId: '23',
    jobId: 11,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '234',
    studentId: '23',
    jobId: 12,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '235',
    studentId: '23',
    jobId: 13,
    markValue: '-',
    deleted: 0,
  },
  {
    id: '236',
    studentId: '22',
    jobId: 10,
    markValue: '3',
    deleted: 0,
  },
  {
    id: '237',
    studentId: '24',
    jobId: 10,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '238',
    studentId: '24',
    jobId: 11,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '239',
    studentId: '24',
    jobId: 12,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '240',
    studentId: '24',
    jobId: 13,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '241',
    studentId: '25',
    jobId: 10,
    markValue: '3',
    deleted: 0,
  },
  {
    id: '242',
    studentId: '25',
    jobId: 11,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '243',
    studentId: '25',
    jobId: 12,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '244',
    studentId: '25',
    jobId: 13,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '245',
    studentId: '26',
    jobId: 10,
    markValue: '3',
    deleted: 0,
  },
  {
    id: '246',
    studentId: '26',
    jobId: 11,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '247',
    studentId: '26',
    jobId: 12,
    markValue: '3',
    deleted: 0,
  },
  {
    id: '248',
    studentId: '26',
    jobId: 13,
    markValue: '4',
    deleted: 0,
  },
  {
    id: '249',
    studentId: '27',
    jobId: 10,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '250',
    studentId: '27',
    jobId: 11,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '251',
    studentId: '27',
    jobId: 12,
    markValue: '5',
    deleted: 0,
  },
  {
    id: '252',
    studentId: '27',
    jobId: 13,
    markValue: '5',
    deleted: 0,
  },
];

knex('marks')
  .insert(marks)
  .then(() => console.log('marks inserted'))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });
