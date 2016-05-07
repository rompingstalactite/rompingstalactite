import { createStore, combineReducers } from 'redux';
import fakeRecipe from './fakeRecipe';

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

// Make fake reducers
const profile = (state = initialStateProfile) => state;
const recipesOwned = (state = initialStateRecipes) => state;
const recipesFollowed = (state = initialStateRecipes) => state;
const recipesFeatured = (state = initialStateRecipes) => state;
const recipesSearched = (state = initialStateRecipes) => state;
const recipesTop = (state = initialStateRecipes) => state;
const recipe = (state = initialStateRecipe) => state;
const editRecipe = (state = initialRecipe, action) => {
  switch (action.type) {
    case 'EDIT_RECIPE':
      return Object.assign({}, state, action.change);
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
  recipe: editRecipe,
});

export default createStore(fakeRootReducer);
