'use strict';

var _seedData = require('./seedData');

var _utils = require('../../client/utils/utils');

var dispStatus = function dispStatus(recipe) {
  console.log('Creating recipe: ', recipe.title);
};

// Make sure to comment out auth middleware in routes.js before running
_seedData.recipeSeed.forEach(function (recipe) {
  (0, _utils.createRecipe)(recipe, dispStatus);
});