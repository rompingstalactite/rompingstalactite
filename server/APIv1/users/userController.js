import { postgresConnection as cn } from '../../config/helpers.js';
const pgp = require('pg-promise')();

console.log('Accessing DB with credentials:', cn);

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
      text: 'insert into users(username, created_at, avatar) values ($1, $2, $3) returning *',
      values: [request.body.username, request.body.createdAt, request.body.avatar],
    };

    db.one(queryObj)
      .then((data) => {
        response.status(201);
        response.json(data);
        next();
      })
      .catch((error) => {
        if (error.code === '23505' || error.code === '23502') {
          response.status(202);
          response.json({
            usualError: 'user exists, please try another username',
            actualError: `Error code: ${error.code}, Error message: ${error.detail}`,
          });
          next();
        } else {
          response.status(500);
          response.json({
            error: `Error code: ${error.code}, Error message: ${error.detail}`,
          });
          next();
        }
      });
  },

  getOneUser: (request, response, next) => {
    /**
     * get one value out of the database
     * http://vitaly-t.github.io/pg-promise/Database.html#.one
     *
     * @param  {object}  query object
     * @param  {array}   array of values, mapped to $1, $2, ...
     *                     in querystring, indexed on 1
     *
     * @return {Promise}  when 1 row is returned, it resolves with that row as a single object;
     *                    when no rows are returned, it rejects with QueryResultError = No data returned from the query.
     *                    when multiple rows are returned, it rejects with QueryResultError = Multiple rows were not expected.
     */
    db.one({
      name: 'find-user',
      text: 'select * from users where id = $1',
      values: [request.params.user_id],
    })
      .then((data) => {
        response.json(data);
        next();
      })
      .catch((error) => {
        response.json({
          error: `Error code: ${error.code}, Error message: ${error.detail}`,
        });
        next();
      });
  },
};
