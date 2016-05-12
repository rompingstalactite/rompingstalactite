import { postgresConnection as cn } from '../../config/helpers.js';
const pgp = require('pg-promise')();
const db = pgp(cn);

module.exports = {
  getOneRecipe: (request, response, next) => {
    const newQueryObj = {
      name: 'get-one-recipe',
      text: `SELECT
               *
             FROM
               recipes
             WHERE
               id = $1`,
      values: [request.params.recipe_id],
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
      values: [request.query.recipes],
    };

    db.query(newQueryObj).then((data) => {
      response.json(data);
      next();
    }).catch((error) => {
      response.json(error);
      next();
    });
  },
  addRecipeImage: (request, response, next) => {
    const newQueryObj = {
      name: 'add-recipe-image',
      text: `UPDATE recipes
              SET
                images = array_append(images, $1)
              WHERE
                id = $2`,
      values: [request.body.newURL, request.body.id],
    };

    const newQueryObj2 = {
      name: 'find-new-recipe-image',
      text: `SELECT images
              FROM recipes
                WHERE $1 = ANY(images)
                AND id = $2`,
      values: [request.body.newURL, request.body.id],
    };
    db.query(newQueryObj);
    db.query(newQueryObj2)
      .then((data) => {
        response.status(201);
        response.json(data);
        next();
      }).catch((error) => {
        response.json(error);
        next();
      });
  },

  removeRecipeImage: (request, response, next) => {
    const newQueryObj = {
      name: 'remove-recipe-image',
      text: `UPDATE recipes
              SET
                images = array_remove(images, $1)
              WHERE
                id = $2`,
      values: [request.body.newURL, request.body.id],
    };

    const newQueryObj2 = {
      name: 'find-new-recipe-image',
      text: `SELECT images
              FROM recipes
                WHERE $1 = ANY(images)
                AND id = $2`,
      values: [request.body.newURL, request.body.id],
    };

    db.query(newQueryObj);
    db.query(newQueryObj2).then((data) => {
      response.json(data);
      next();
    }).catch((error) => {
      response.json(error);
      next();
    });
  },

  createRecipe: (request, response, next) => {
    let queryObj;

    if (request.body.fork_history) {
      queryObj = {
      name: 'create-recipe',
      text: `insert into recipes(
        title,
        images,
        followers,
        yield,
        yield_unit,
        ingredients,
        prep_time,
        prep_steps,
        cook_time,
        cook_steps,
        finish_steps,
        tags,
        parent,
        author,
        fork_history
      ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) returning *`,
      values: [
        request.body.title,
        request.body.images,
        request.body.followers,
        request.body.yield,
        request.body.yield_unit,
        request.body.ingredients,
        request.body.prep_time,
        request.body.prep_steps,
        request.body.cook_time,
        request.body.cook_steps,
        request.body.finish_steps,
        request.body.tags,
        request.body.parent,
        request.body.author,
        request.body.fork_history,
      ],
      };
    } else {
      queryObj = {
        name: 'create-recipe',
        text: `insert into recipes(
          title,
          images,
          followers,
          yield,
          yield_unit,
          ingredients,
          prep_time,
          prep_steps,
          cook_time,
          cook_steps,
          finish_steps,
          tags,
          parent,
          author,
        ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) returning *`,
        values: [
          request.body.title,
          request.body.images,
          request.body.followers,
          request.body.yield,
          request.body.yield_unit,
          request.body.ingredients,
          request.body.prep_time,
          request.body.prep_steps,
          request.body.cook_time,
          request.body.cook_steps,
          request.body.finish_steps,
          request.body.tags,
          request.body.parent,
          request.body.author,
        ],
      };
    }

    db.one(queryObj)
      .then((data) => {
        response.status(201);
        response.json(data);
        next();
      })
      .catch((error) => {
        response.status(500);
        response.json({
          error: `Error code: ${error.code}, Error message: ${error.detail}`,
        });
        next();
      });
  },

  forkRecipe: (request, response, next) => {

    const newQueryObj = {
      name: 'fork-recipe',
      text: `INSERT INTO recipes (
              created_at,
              updated_at,
              title,
              author,
              parent,
              images,
              yield,
              yield_unit,
              ingredients,
              fork_history,
              prep_time,
              prep_steps,
              cook_time,
              cook_steps,
              finish_steps,
              tags,
              followers
            )
              SELECT
                created_at,
                updated_at,
                title,
                $1,
                author,
                images,
                yield,
                yield_unit,
                ingredients,
                (SELECT array_append (fork_history, $2)),
                prep_time,
                prep_steps,
                cook_time,
                cook_steps,
                finish_steps,
                tags,
                followers
              FROM
                recipes
                WHERE
                  id = $2
              RETURNING
                id;`,
      values: [request.body.user_id, request.body.recipe_id],
    };

    db.query(newQueryObj)
    .then((data) => {
      response.status(201);
      response.json(data);
      next();
    }).catch((error) => {
      response.status(500);
      response.json(error);
      next();
    });
  },
};
