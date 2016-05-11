import { postgresConnection as cn } from '../../config/helpers.js';
const pgp = require('pg-promise')();
const db = pgp(cn);


module.exports = {


  getAllLikedRecipes: (request, response, next) => {
    const newQueryObj = {
      name: 'get-my-favorite-recipes',
      text: `SELECT
              *
            FROM
              recipes r INNER JOIN likes_recipes_users lru
            ON
              lru.recipe_id = r.id INNER JOIN users u
            ON
              lru.user_id = u.id
            WHERE
              u.id = $1;`,
      values: [
        request.params.user,
      ],
    }

    db.query(newQueryObj)
      .then((data) => {
        response.status(200);
        response.json(data);
        next();
      })
      .catch((error) => {
        console.log(error);
        next();
      });
  }
};
