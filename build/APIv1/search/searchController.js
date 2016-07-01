'use strict';

var _helpers = require('../../config/helpers.js');

var _recipeController = require('../recipes/recipeController.js');

var pgp = require('pg-promise')();
var db = pgp(_helpers.postgresConnection);

module.exports = {

  searchRecipes: function searchRecipes(request, response, next) {
    // const queryObj = {
    //   name: 'search-recipe-title',
    //   text: `SELECT id FROM recipes WHERE title ~* $1`,
    //   values: [request.params.q.toString()],
    // };
    var queryObj = {
      name: 'search-recipe-tag',
      text: '\n            SELECT id FROM recipes\n            WHERE recipes.title ~* $1\n            OR $1 like ANY(recipes.tags)\n            ',
      values: [request.params.q]
    };

    // functional simple title search
    // text: `SELECT id FROM recipes WHERE title ~* $1`,

    db.query(queryObj).then(function (data) {
      response.status(200);
      request.body.recipes = data.map(function (val) {
        return val.id;
      });
      return (0, _recipeController.getMultipleRecipes)(request, response, next);
    }).catch(function (error) {

      response.status(500);
      response.json({
        error: 'Error code: ' + error.code + ', Error message: ' + error.detail
      });
    });
  }

};