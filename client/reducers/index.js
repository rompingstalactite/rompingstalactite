import { combineReducers } from 'redux';
import profile from './profile.js';
import recipesFollowed from './recipesFollowed.js';
import recipesOwned from './recipesOwned.js';

const rootReducer = combineReducers({
  profile,
  recipesFollowed,
  recipesOwned,
});

export default rootReducer;
