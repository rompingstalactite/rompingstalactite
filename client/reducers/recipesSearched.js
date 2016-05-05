// import * as types from '../constants/ActionTypes.js';

// const initialState = [];

// =====
// SEED DATA FOR TESTING
// =====

const initialState = [
  { name: 'Searched Recipe 1' },
  { name: 'Searched Recipe 2' },
  { name: 'Searched Recipe 3' }];

export default function recipesSearched(state = initialState /*, action*/) {
  // switch (action.type) {
  // case types.UPDATE_RECIPES:
  //   return state.concat(action.recipes);
  // default:
  return state;
  // }
}
