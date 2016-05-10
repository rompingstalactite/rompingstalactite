// import * as types from '../constants/ActionTypes.js';

// const initialState = [];

// =====
// SEED DATA FOR TESTING
// =====

const initialState = [
  { title: 'Owned Recipe 1' },
  { title: 'Owned Recipe 2' },
  { title: 'Owned Recipe 3' }];

export default function recipesOwned(state = initialState /*, action*/) {
  // switch (action.type) {
  // case types.UPDATE_RECIPES:
  //   return state.concat(action.recipes);
  // default:
  return state;
  // }
}
