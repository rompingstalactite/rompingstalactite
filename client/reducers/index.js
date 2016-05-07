import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import profile from './profile.js';
import recipesFeatured from './recipesFeatured.js';
import recipesFollowed from './recipesFollowed.js';
import editRecipe from './editRecipe.js';
import recipesOwned from './recipesOwned.js';
import recipesSearched from './recipesSearched.js';
import recipesTop from './recipesTop.js';
import toggleEdit from './toggleEdit.js';
import recipe from './recipe.js';

const rootReducer = combineReducers({
  profile,
  recipe: editRecipe,
  recipesFeatured,
  recipesFollowed,
  recipesOwned,
  recipesSearched,
  recipesTop,
  toggleEdit,
  recipe,
  routing: routerReducer,
});

export default rootReducer;
