import { postgresConnection as cn } from '../../config/helpers.js';
import { getMultipleRecipes } from '../recipes/recipeController.js';
const pgp = require('pg-promise')();
const db = pgp(cn);

module.exports = {

  searchRecipes: (request, response, next) => {
    const queryObj = {
      name: 'search-recipe-title',
      text: `SELECT id FROM recipes WHERE title ~* $1`,
      values: [request.params.q.toString()],
    };

    db.query(queryObj)
      .then((data) => {
        response.status(200);
        request.body.recipes = data.map((val) => {
          return val.id;
        });
        return getMultipleRecipes(request, response, next);
      })
      .catch((error) => {
        
        response.status(500);
        response.json({
          error: `Error code: ${error.code}, Error message: ${error.detail}`,
        });
      });
  },

//   searchRecipes: (request, response, next) => {
//     // munge space-separated words into a single OR-separated string
//     // NOTE: this *may* be breaking query sanitization provided by pg-promise
//     if (!request.body) {
//       request.body = {};
//     } else {
//       request.body._queryResultIds = [];
//     }
//
//     const query = decodeURIComponent(request.params.q)
//       .split(' ')
//       .join(' | ');
//
//     const queryObj = {
//       name: 'search-recipes-table',
//       text: `SELECT
//                *
//              FROM (
//                SELECT
//                  to_tsvector(CAST(recipes.id as VARCHAR)) || ' ' ||
//                  to_tsvector(CAST(recipes.ingredients as VARCHAR)) || ' ' ||
//                  to_tsvector(CAST(recipes.cook_steps as VARCHAR)) || ' ' ||
//                  to_tsvector(CAST(recipes.prep_steps as VARCHAR)) || ' ' ||
//                  to_tsvector(CAST(recipes.finish_steps as VARCHAR)) || ' ' ||
//                  to_tsvector(coalesce((string_agg(recipes.title, ' ')), ''))
//                    as document
//                FROM
//                  recipes
//                GROUP BY
//                  recipes.id
//              ) p_search
//              WHERE
//                p_search.document @@ to_tsquery($1);`,
//       values: [query],
//     };
//
//     db.query(queryObj)
//       .then((data) => {
//         response.status(201);
//         request.body.recipes = data.map((val) => {
//           return parseInt(val.document.match(/(?:'1':)(\d+)(?=[,\s])/)[1], 10);
//         });
//         // console.log(request.body._queryResultIds);
//
//         return getMultipleRecipes(request, response, next);
//       })
//       .catch((error) => {
//         // console.log('query error', error)
//         response.json(error);
//         next();
//       });
//   },
};
