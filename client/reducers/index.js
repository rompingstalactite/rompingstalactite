import { combineReducers } from 'redux';
import profile from './profile.js';
import recipesFollowed from './recipesFollowed.js';
import recipesOwned from './recipesOwned.js';
import toggleEdit from './toggleEdit.js';

const rootReducer = combineReducers({
  profile,
  recipesFollowed,
  recipesOwned,
  toggleEdit,
});

export default rootReducer;
