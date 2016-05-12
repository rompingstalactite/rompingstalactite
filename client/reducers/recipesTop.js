import * as types from '../constants/ActionTypes.js';

// const initialState = [];

// =====
// SEED DATA FOR TESTING
// =====

const initialState = [
  { title: 'Top Recipe 1' },
  { title: 'Top Recipe 2' },
  { title: 'Top Recipe 333' }];

export default function recipesTop(state = initialState, action) {
  switch (action.type) {
    case types.RECIPES_TOP:
      return action.change;
    default:
      return state;
  }
}
