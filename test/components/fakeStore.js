import { createStore, combineReducers } from 'redux';
import fakeRecipe from './fakeRecipe';
import * as types from '../../client/constants/ActionTypes.js';

import toggleEdit from '../../client/reducers/toggleEdit';

// Make fake initialStates
const initialRecipe = {
  title: 'Pizza bagels!',
  yield: 12,
  cook_steps: ['cook em up!', 'eat em up!'],
};

const initialStateRecipes = [
  { name: 'Followed Recipe 1' },
  { name: 'Followed Recipe 2' },
  { name: 'Followed Recipe 3' }];

const initialStateProfile = {
  avatar: 'http://www.carderator.com/assets/avatar_placeholder_small.png',
  username: 'USERNAME',
};

const initialStateRecipe = fakeRecipe;

const objectAssign = (...objects) => {
  const newObj = {};
  for (let each in objects) {
    let obj = objects[each];
    for (let prop in obj) {
      newObj[prop] = obj[prop];
    }
  }
  return newObj;
}

// Make fake reducers
const profile = (state = initialStateProfile) => state;
const recipesOwned = (state = initialStateRecipes) => state;
const recipesFollowed = (state = initialStateRecipes) => state;
const recipesFeatured = (state = initialStateRecipes) => state;
const recipesSearched = (state = initialStateRecipes) => state;
const recipesTop = (state = initialStateRecipes) => state;
const recipe = (state = initialStateRecipe, action) => {
  switch (action.type) {
    case types.FORK_RECIPE:
      return action.newRecipe;
    case types.SET_RECIPE:
      return action.recipe;
    case types.EDIT_RECIPE:
      return objectAssign(state, action.change);
    case types.ADD_FIELD:
      const addState = objectAssign(state);
      addState[action.change].push('');
      return addState;
    default:
      return state;
  }
};

const fakeRootReducer = combineReducers({
  profile,
  recipesOwned,
  recipesFollowed,
  recipesTop,
  recipesFeatured,
  recipesSearched,
  recipe,
  toggleEdit,
});

export default createStore(fakeRootReducer);
