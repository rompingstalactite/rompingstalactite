import * as types from '../constants/ActionTypes.js';

module.exports = {
  updateRecipe(recipe) {
    return { type: types.UPDATE_RECIPE, recipe };
  },
};
