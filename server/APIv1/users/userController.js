import { postgresConnection as cn } from '../../config/helpers.js';
const pgp = require('pg-promise')();
const db = pgp(cn);

module.exports = {
  createUser: (request, response, next) => {
    const params = [request.body.username, request.body.avatar,  request.body.created_at];

    db.none('insert into users(username, avatar, created_at) values($1, $2, $3)', params)
      .then(() => {
        response.json({ totally: 'working' });
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
