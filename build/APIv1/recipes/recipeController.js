'use strict';

var _helpers = require('../../config/helpers.js');

var pgp = require('pg-promise')();
var db = pgp(_helpers.postgresConnection);

module.exports = {
  getOneRecipe: function getOneRecipe(request, response, next) {
    var newQueryObj = {
      name: 'get-one-recipe',
      text: '\n          SELECT recipes.*, users.display_name\n          FROM recipes\n          INNER JOIN users on recipes.author = users.id\n          WHERE recipes.id = $1\n          ',
      values: [request.params.recipe_id]
    };

    db.one(newQueryObj).then(function (data) {
      response.json(data);
    }).catch(function (error) {
      response.json(error);
    });
  },
  getMultipleRecipes: function getMultipleRecipes(request, response, next) {
    // left over from searchController
    // console.log(request.body._queryResultIds);
    var newQueryObj = {
      name: 'get-multiple-recipes',
      text: '\n          SELECT recipes.*, users.display_name\n          FROM recipes\n          INNER JOIN users on recipes.author = users.id\n          WHERE recipes.id = ANY($1)\n          ',
      values: [request.query.recipes || request.body.recipes]
    };

    db.query(newQueryObj).then(function (data) {
      response.json(data);
    }).catch(function (error) {
      response.json(error);
    });
  },
  addRecipeImage: function addRecipeImage(request, response, next) {
    var newQueryObj = {
      name: 'add-recipe-image',
      text: 'UPDATE recipes\n              SET\n                images = array_append(images, $1)\n              WHERE\n                id = $2',
      values: [request.body.newURL, request.body.id]
    };

    var newQueryObj2 = {
      name: 'find-new-recipe-image-after-adding',
      text: 'SELECT images\n              FROM recipes\n                WHERE $1 = ANY(images)\n                AND id = $2',
      values: [request.body.newURL, request.body.id]
    };
    db.query(newQueryObj);
    db.query(newQueryObj2).then(function (data) {
      response.status(201);
      response.json(data);
      next();
    }).catch(function (error) {
      response.json(error);
      next();
    });
  },

  removeRecipeImage: function removeRecipeImage(request, response, next) {
    var newQueryObj = {
      name: 'remove-recipe-image',
      text: 'UPDATE recipes\n              SET\n                images = array_remove(images, $1)\n              WHERE\n                id = $2',
      values: [request.body.newURL, request.body.id]
    };

    var newQueryObj2 = {
      name: 'find-new-recipe-image-after-removing',
      text: 'SELECT images\n              FROM recipes\n                WHERE $1 = ANY(images)\n                AND id = $2',
      values: [request.body.newURL, request.body.id]
    };

    db.query(newQueryObj);
    db.query(newQueryObj2).then(function (data) {
      response.json(data);
      next();
    }).catch(function (error) {
      response.json(error);
      next();
    });
  },

  createRecipe: function createRecipe(request, response, next) {
    var queryObj = void 0;

    if (request.body.fork_history) {
      queryObj = {
        name: 'create-recipe-with-fork',
        text: 'insert into recipes(\n        title,\n        images,\n        followers,\n        yield,\n        yield_unit,\n        ingredients,\n        prep_time,\n        prep_steps,\n        cook_time,\n        cook_steps,\n        finish_steps,\n        tags,\n        parent,\n        author,\n        fork_history\n      ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) returning *',
        values: [request.body.title, request.body.images, request.body.followers, request.body.yield, request.body.yield_unit, request.body.ingredients, request.body.prep_time, request.body.prep_steps, request.body.cook_time, request.body.cook_steps, request.body.finish_steps, request.body.tags, request.body.parent, request.body.author, request.body.fork_history]
      };
    } else {
      queryObj = {
        name: 'create-recipe-from-scratch',
        text: 'insert into recipes(\n          title,\n          images,\n          followers,\n          yield,\n          yield_unit,\n          ingredients,\n          prep_time,\n          prep_steps,\n          cook_time,\n          cook_steps,\n          finish_steps,\n          tags,\n          parent,\n          author\n        ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) returning *',
        values: [request.body.title, request.body.images, request.body.followers, request.body.yield, request.body.yield_unit, request.body.ingredients, request.body.prep_time, request.body.prep_steps, request.body.cook_time, request.body.cook_steps, request.body.finish_steps, request.body.tags, request.body.parent, request.body.author]
      };
    }

    db.one(queryObj).then(function (data) {
      response.status(201);
      response.json(data);
    }).catch(function (error) {
      response.status(500);
      response.json({
        error: 'Error code: ' + error.code + ', Error message: ' + error.detail
      });
    });
  },

  editRecipe: function editRecipe(request, response, next) {
    var queryObj = {
      name: 'edit-recipe',
      text: 'UPDATE recipes\n              SET\n                (title,\n                images,\n                followers,\n                yield,\n                yield_unit,\n                ingredients,\n                prep_time,\n                prep_steps,\n                cook_time,\n                cook_steps,\n                finish_steps,\n                tags,\n                parent,\n                author)\n              = ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)\n              WHERE id = $15 returning *',
      values: [request.body.title, request.body.images, request.body.followers, request.body.yield, request.body.yield_unit, request.body.ingredients, request.body.prep_time, request.body.prep_steps, request.body.cook_time, request.body.cook_steps, request.body.finish_steps, request.body.tags, request.body.parent, request.body.author, request.body.id]
    };
    db.one(queryObj).then(function (data) {
      response.status(201);
      response.json(data);
    }).catch(function (error) {
      response.status(500);
      response.json({
        error: 'Error code: ' + error.code + ', Error message: ' + error.detail
      });
    });
  },

  trendingRecipes: function trendingRecipes(request, response, next) {
    var interval = request.body.interval || '1 day';
    var limit = request.body.limit || 10;
    var newQueryObj = {
      name: 'trending-recipes',
      text: 'SELECT\n                parent, COUNT(parent)\n              FROM\n                recipes\n              WHERE\n                created_at > CURRENT_TIMESTAMP - INTERVAL \'1 year\'\n              AND\n                parent is not null\n              GROUP BY\n                parent, id\n              ORDER BY\n                COUNT (parent) DESC\n              LIMIT $1',
      values: [limit]
    };

    db.query(newQueryObj).then(function (data) {
      var trendingIds = data.map(function (element) {
        return element.parent;
      });
      return trendingIds;
    }).then(function (trendingIds) {
      var newQueryObj2 = {
        name: 'get-multiple-trending-recipes',
        text: 'SELECT *\n                   FROM\n                     recipes\n                   WHERE\n                     id = ANY($1)',
        values: [trendingIds]
      };
      return db.query(newQueryObj2);
    }).then(function (data) {
      response.json(data);
    }).catch(function (error) {
      response.json(error);
    });
  },
  getAllCreatedRecipes: function getAllCreatedRecipes(request, response, next) {
    var newQueryObj = {
      name: 'get-my-created-recipes',
      text: 'SELECT\n              *\n            FROM\n              recipes r\n            WHERE\n              r.author = $1;',
      values: [request.params.user]
    };

    db.query(newQueryObj).then(function (data) {
      response.status(200);
      response.json(data);
    }).catch(function (error) {
      response.json(error);
    });
  }
};