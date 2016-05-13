import * as types from '../constants/ActionTypes.js';

module.exports = {
  updateRecipe(recipe) {
    return { type: types.UPDATE_RECIPE, recipe };
  },
  toggleEdit() {
    return { type: types.TOGGLE_EDIT };
  },
  forkRecipe(newRecipe) {
    return { type: types.FORK_RECIPE, newRecipe };
  },
  editRecipe(recipeChange) {
    return { type: types.EDIT_RECIPE, change: recipeChange };
  },
  addField(fieldChange) {
    return { type: types.ADD_FIELD, change: fieldChange };
  },
  removeField(fieldChange) {
    return { type: types.REMOVE_FIELD, change: fieldChange };
  },
  setUser(user) {
    return { type: types.SET_USER, user };
  },
  setRecipeHistory(historyRecipes) {
    return { type: types.SET_RECIPE_HISTORY, historyRecipes };
  },
  toggleLike(toggleLike) {
    return { type: types.TOGGLE_LIKE, change: toggleLike };
  },
  recipesTop(trendingRecipeChange) {
    return { type: types.RECIPES_TOP, change: trendingRecipeChange };
  },
  setRecipe(recipe) {
    return { type: types.SET_RECIPE, recipe };
  },
  setRecipeList(recipeArr) {
    return { type: types.SET_RECIPE_LIST, change: recipeArr };
  },
  setProfileUser(user) {
    return { type: types.SET_PROFILE_USER, user };
  },
  setProfileRecipesLiked(recipesLiked) {
    return { type: types.SET_PROFILE_RECIPES_LIKED, recipesLiked };
  },
  setProfileRecipesCreated(recipesCreated) {
    return { type: types.SET_PROFILE_RECIPES_CREATED, recipesCreated };
  },
};
