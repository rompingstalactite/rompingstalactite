import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import profile from './profile.js';
import recipesFollowed from './recipesFollowed.js';
import recipesOwned from './recipesOwned.js';
import recipesFeatured from './recipesFeatured.js';
import recipesSearched from './recipesSearched.js';
import recipesTop from './recipesTop.js';
import toggleEdit from './toggleEdit.js';

const rootReducer = combineReducers({
  profile,
  recipesFeatured,
  recipesFollowed,
  recipesOwned,
  recipesSearched,
  recipesTop,
  toggleEdit,
  routing: routerReducer,
});

export default rootReducer;
