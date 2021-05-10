import * as moment from 'moment';
import bcrypt from 'bcryptjs';
import jwt from 'jwt-simple';

import TOKEN_SECRET from '../../env/token';

export const encodeToken = (user) => {
  const playload = {
    exp: moment().add(14, 'days').unix(),
    iat: moment().unix(),
    sub: user,
  };
  return jwt.encode(playload, TOKEN_SECRET);
};

export const decodeToken = (token, callback) => {
  const payload = jwt.decode(token, TOKEN_SECRET);
  const now = moment().unix();
  // check if the token has expired
  if (now > payload.exp) callback('Token has expired.');
  else callback(null, payload);
};

//TODO Пока касытлная передача knex. По хорошему надо вынести всё по модулям
export const createUser = (knex, req) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  return knex('teachers').insert({
    email: req.body.email,
    password: hash,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    isAdmin: req.body.isAdmin,
  });
};

export const getUser = async (knex, email) => {
  return knex('teachers').where({ email }).first();
};

export const comparePass = async (userPassword, databasePassword) => {
  return await bcrypt.compare(userPassword, databasePassword);
};
