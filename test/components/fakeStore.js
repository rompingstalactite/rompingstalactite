import { createStore, combineReducers } from 'redux';

// Make fake initialStates
const initialStateRecipes = [
  { name: 'Followed Recipe 1' },
  { name: 'Followed Recipe 2' },
  { name: 'Followed Recipe 3' }];

const initialStateProfile = {
  avatar: 'http://www.carderator.com/assets/avatar_placeholder_small.png',
  username: 'USERNAME',
};

// Make fake reducers
const profile = (state = initialStateProfile) => state;
const recipesOwned = (state = initialStateRecipes) => state;
const recipesFollowed = (state = initialStateRecipes) => state;
const fakeRootReducer = combineReducers({ profile, recipesOwned, recipesFollowed });

export default createStore(fakeRootReducer, initialStateProfile);
