'use strict';

var _helpers = require('../../config/helpers.js');

var pgp = require('pg-promise')();
var db = pgp(_helpers.postgresConnection);

module.exports = {
  addOrDeleteRecipeLike: function addOrDeleteRecipeLike(request, response) {
    if (request.body.toggleLike) {
      module.exports.deleteLikedRecipe(request, response);
    } else {
      module.exports.addLikedRecipe(request, response);
    }
  },
  getLikeState: function getLikeState(request, response) {
    var userID = request.query.userID || request.body.userID;
    var recipeID = request.query.recipeID || request.body.recipeID;
    var newQueryObj = {
      name: 'find-user-recipe-like',
      text: 'WITH recipe_of_interest AS (\n              SELECT\n                user_id\n              FROM\n                likes_recipes_users\n              WHERE\n                recipe_id = $2\n            )\n            SELECT\n              count(*) AS likeCount,\n              (EXISTS\n                (SELECT\n                  1\n                FROM\n                  recipe_of_interest\n                WHERE\n                  user_id = $1)\n              ) AS toggleLike\n            FROM\n              recipe_of_interest;',
      values: [userID, recipeID]
    };
    db.one(newQueryObj).then(function (data) {
      response.json(data);
    }).catch(function (error) {
      response.json(error);
    });
  },
  addLikedRecipe: function addLikedRecipe(request, response) {
    var newQueryObj = {
      name: 'add-liked-recipe',
      text: '-- WITH upsert AS (\n               INSERT INTO\n                 likes_recipes_users\n                   (user_id, recipe_id)\n               VALUES\n                 ($1, $2)\n               ON CONFLICT\n                 (user_id, recipe_id)\n               DO NOTHING\n               RETURNING *;\n             -- ),\n             -- // TODO: would be better to select from\n             -- likes count column in recipes table\n             -- and add one to that, since exactness isn\'t\n             -- important and since it would be faster\n            -- recipe_of_interest AS (\n            --   SELECT\n            --     user_id\n            --   FROM\n            --     likes_recipes_users\n            --   WHERE\n            --     recipe_id = $2\n            -- )\n            -- SELECT\n            --   count(*) AS likeCount,\n            --   (EXISTS\n            --     (SELECT\n            --       1\n            --     FROM\n            --       recipe_of_interest\n            --     WHERE\n            --       user_id = $1)\n            --   ) AS toggleLike\n            -- FROM\n            --   recipe_of_interest;',
      values: [request.body.userID, request.body.recipeID]
    };

    db.query(newQueryObj).then(function (data) {
      console.log(data);
      // response.json(data);
      module.exports.getLikeState(request, response);
    }).catch(function (error) {
      response.json(error);
    });
  },

  deleteLikedRecipe: function deleteLikedRecipe(request, response) {
    var newQueryObj = {
      name: 'delete-liked-recipe',
      text: '-- WITH deleting AS (\n               DELETE FROM\n                 likes_recipes_users\n               WHERE user_id = $1\n               AND recipe_id = $2\n               RETURNING *;\n             -- // TODO: would be better to select from\n             -- likes count column in recipes table\n             -- and add one to that, since exactness isn\'t\n             -- important and since it would be faster\n             -- ),\n             --recipe_of_interest AS (\n             --  SELECT\n             --    user_id\n             --  FROM\n             --    likes_recipes_users\n             --  WHERE\n             --    recipe_id = $2\n             --)\n             --SELECT\n             --  count(*) AS likeCount,\n             --  (EXISTS\n             --    (SELECT\n             --      1\n             --    FROM\n             --      recipe_of_interest\n             --    WHERE\n             --      user_id = $1)\n             --  ) AS toggleLike\n             --FROM\n             --  recipe_of_interest;',
      values: [request.body.userID, request.body.recipeID]
    };

    db.query(newQueryObj).then(function (data) {
      // console.log(data);
      // response.json(data);
      module.exports.getLikeState(request, response);
    }).catch(function (error) {
      response.json(error);
      // console.log(error);
      // possible errors:
      // query failed for unknown reason
    });
  },

  getAllLikedRecipes: function getAllLikedRecipes(request, response) {
    var newQueryObj = {
      name: 'get-my-favorite-recipes',
      text: 'SELECT\n              *\n            FROM\n              recipes r INNER JOIN likes_recipes_users lru\n            ON\n              lru.recipe_id = r.id INNER JOIN users u\n            ON\n              lru.user_id = u.id\n            WHERE\n              u.id = $1;',
      values: [request.params.user]
    };

    db.query(newQueryObj).then(function (data) {
      response.status(200);
      response.json(data);
    }).catch(function (error) {
      console.log(error);
      response.json(error);
    });
  }
};