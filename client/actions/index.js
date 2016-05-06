import * as types from '../constants/ActionTypes.js';

module.exports = {
  updateRecipe(recipe) {
    return { type: types.UPDATE_RECIPE, recipe };
  },
  toggleEdit() {
    return { type: types.TOGGLE_EDIT };
  },
  fork(userId) {
    return { type: types.FORK_RECIPE, userId };
  },
};
