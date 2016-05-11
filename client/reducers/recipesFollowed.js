// import * as types from '../constants/ActionTypes.js';

// const initialState = [];

// =====
// SEED DATA FOR TESTING
// =====

const initialState = [
  { title: 'Followed Recipe 1' },
  { title: 'Followed Recipe 2' },
  { title: 'Followed Recipe 3' }];

export default function recipesFollowed(state = initialState /*, action*/) {
  // switch (action.type) {
  // case types.UPDATE_RECIPES:
  //   return state.concat(action.recipes);
  // default:
  return state;
  // }
}
