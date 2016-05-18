import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import recipesFeatured from './recipesFeatured.js';
import recipesSearched from './recipesSearched.js';
import recipesTop from './recipesTop.js';
import recipe from './recipe.js';
import user from './user.js';
import profile from './profile.js';
import toggleLike from './toggleLike.js';
import mainRecipeImage from './mainRecipeImage.js';
import recipeOwner from './recipeOwner.js';
import toggleFollow from './toggleFollow.js';

const rootReducer = combineReducers({
  recipesFeatured,
  recipesSearched,
  recipesTop,
  mainRecipeImage,
  recipeOwner,
  recipe,
  user,
  toggleLike,
  toggleFollow,
  profile,
  routing: routerReducer,
});

export default rootReducer;
