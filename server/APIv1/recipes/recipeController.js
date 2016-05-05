import { postgresConnection as cn } from '../../config/helpers.js';
const pgp = require('pg-promise')();
const db = pgp(cn);

module.exports = {
  getOneRecipe: (request, response, next) => {
    const newQueryObj = {
      name: 'get-one-recipe',
      text: `SELECT
               1
             FROM
               recipes
             WHERE
               id = $1`,
      values: [request.params.id],
    };

    db.one(newQueryObj)
      .then((data) => {
        response.json(data);
        next();
      }).catch((error) => {
        response.json(error);
        next();
      });
  },
  getMultipleRecipes: (request, response, next) => {
    const newQueryObj = {
      name: 'get-multiple-recipes',
      text: `SELECT *
                 FROM
                   recipes
                 WHERE
                   id = ANY($1)`,
      values: [request.body._queryResultIds],
    };

    db.query(newQueryObj).then((data) => {
      response.json(data);
      next();
    }).catch((error) => {
      response.json(error);
      next();
    });
  },
};
