import * as types from '../constants/ActionTypes.js';

module.exports = {
  updateRecipe: function(recipe) {
    return { type: types.UPDATE_RECIPE, recipe };
  },
};
