import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import recipesFeatured from './recipesFeatured.js';
import recipesFollowed from './recipesFollowed.js';
import recipesOwned from './recipesOwned.js';
import recipesSearched from './recipesSearched.js';
import recipesTop from './recipesTop.js';
import toggleEdit from './toggleEdit.js';
import recipe from './recipe.js';
import user from './user.js';
import profile from './profile.js';
import toggleLike from './toggleLike.js';

const rootReducer = combineReducers({
  recipesFeatured,
  recipesFollowed,
  recipesOwned,
  recipesSearched,
  recipesTop,
  toggleEdit,
  recipe,
  user,
  toggleLike,
  profile,
  routing: routerReducer,
});

export default rootReducer;
