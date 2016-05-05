// import * as types from '../constants/ActionTypes.js';

// const initialState = [];

// =====
// SEED DATA FOR TESTING
// =====

const initialState = [
  { name: 'Featured Recipe 1' },
  { name: 'Featured Recipe 2' },
  { name: 'Featured Recipe 3' }];

export default function recipesFeatured(state = initialState /*, action*/) {
  // switch (action.type) {
  // case types.UPDATE_RECIPES:
  //   return state.concat(action.recipes);
  // default:
  return state;
  // }
}
