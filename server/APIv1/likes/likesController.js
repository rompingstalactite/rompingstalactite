import { postgresConnection as cn } from '../../config/helpers.js';
const pgp = require('pg-promise')();
const db = pgp(cn);


module.exports = {
  addOrDeleteRecipeLike: (request, response, next) => {
    if (request.body.toggleLike) {
      module.exports.deleteLikedRecipe(request, response, next);
    } else {
      module.exports.addLikedRecipe(request, response, next);
    }
  },
  getLikeState: (request, response, next) => {
    const userID = request.query.userID || request.body.userID;
    const recipeID = request.query.recipeID || request.body.recipeID;
    const newQueryObj = {
      name: 'find-user-recipe-like',
      text: `WITH recipe_of_interest AS (
              SELECT
                user_id
              FROM
                likes_recipes_users
              WHERE
                recipe_id = $2
            )
            SELECT
              count(*) AS likeCount,
              (EXISTS
                (SELECT
                  1
                FROM
                  recipe_of_interest
                WHERE
                  user_id = $1)
              ) AS toggleLike
            FROM
              recipe_of_interest;`,
      values: [userID, recipeID],
    };
    db.one(newQueryObj).then(data => {
      response.json(data);
      next();
    }).catch((error) => {
      response.json(error);
      next();
    });
  },
  addLikedRecipe: (request, response, next) => {
    const newQueryObj = {
      name: 'add-liked-recipe',
      text: `-- WITH upsert AS (
               INSERT INTO
                 likes_recipes_users
                   (user_id, recipe_id)
               VALUES
                 ($1, $2)
               ON CONFLICT
                 (user_id, recipe_id)
               DO NOTHING
               RETURNING *;
             -- ),
             -- // TODO: would be better to select from
             -- likes count column in recipes table
             -- and add one to that, since exactness isn't
             -- important and since it would be faster
            -- recipe_of_interest AS (
            --   SELECT
            --     user_id
            --   FROM
            --     likes_recipes_users
            --   WHERE
            --     recipe_id = $2
            -- )
            -- SELECT
            --   count(*) AS likeCount,
            --   (EXISTS
            --     (SELECT
            --       1
            --     FROM
            --       recipe_of_interest
            --     WHERE
            --       user_id = $1)
            --   ) AS toggleLike
            -- FROM
            --   recipe_of_interest;`,
      values: [
        request.body.userID,
        request.body.recipeID,
      ],
    };

    db.query(newQueryObj).then(data => {
      // console.log(data);
      // response.json(data);
      module.exports.getLikeState(request, response, next);
      // next();
    }).catch((error) => {
      response.json(error);
      // possible errors:
      // recipe does not exist
      // user does not exist
      // both recipe and user do not exist
      // query failed
      next();
    });
  },

  deleteLikedRecipe: (request, response, next) => {
    const newQueryObj = {
      name: 'delete-liked-recipe',
      text: `-- WITH deleting AS (
               DELETE FROM
                 likes_recipes_users
               WHERE user_id = $1
               AND recipe_id = $2
               RETURNING *;
             -- // TODO: would be better to select from
             -- likes count column in recipes table
             -- and add one to that, since exactness isn't
             -- important and since it would be faster
             -- ),
             --recipe_of_interest AS (
             --  SELECT
             --    user_id
             --  FROM
             --    likes_recipes_users
             --  WHERE
             --    recipe_id = $2
             --)
             --SELECT
             --  count(*) AS likeCount,
             --  (EXISTS
             --    (SELECT
             --      1
             --    FROM
             --      recipe_of_interest
             --    WHERE
             --      user_id = $1)
             --  ) AS toggleLike
             --FROM
             --  recipe_of_interest;`,
      values: [
        request.body.userID,
        request.body.recipeID,
      ],
    };

    db.query(newQueryObj).then(data => {
      // console.log(data);
      // response.json(data);
      module.exports.getLikeState(request, response, next);
      // next();
    }).catch((error) => {
      console.log(error);
      // possible errors:
      // query failed for unknown reason
      next();
    });
  },

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
