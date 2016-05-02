import { postgresConnection as cn } from '../../config/helpers.js';
const pgp = require('pg-promise')();
const db = pgp(cn);

module.exports = {
  getAllUsers: (request, response, next) => {
    response.status(403);
    response.json({data: 'forbidden'});
    next();
  },
  createUser: (request, response, next) => {
    const queryObj = {
      name: 'insert-user',
      text: 'insert into users(username, created_at, avatar) values ($1, $2, $3)',
      values: [request.body.username, request.body.createdAt, request.body.avatar],
    };

    db.none(queryObj)
      .then((data) => {
        response.status(201);
        response.json(data);
        next();
      })
      .catch((error) => {
        if (error.code === '23505' || error.code === '23502') {
          response.status(202);
          response.json({ error: 'user exists, please try another username' });
          next();
        } else if (error.code === '22007') {
          console.log(error);
          response.status(202);
          response.json({ error: 'please yell at the developers: they cant code well'});
        } else {
          response.json({error: `Error code: ${error.code}, Error message: ${error.detail}`});
          next();
        }
      });
  },

  getOneUser: (request, response, next) => {
    response.json({ totally: 'working '});
  },

  getAllUsers: (request, response, next) => {
    response.status(403);
    next();
  },

  // getCurrentUser: function () {
  //   return true;
  // },

  // updateUser: function () {
  //   return true;
  // },


  // findFollowers: function () {
  //   return true;
  // }
};
