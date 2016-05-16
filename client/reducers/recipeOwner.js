import * as types from '../constants/ActionTypes.js';

const initialState = 'User';

export default function profile(state = initialState, action) {
  switch (action.type) {
    case types.SET_RECIPE_OWNER:
      return action.change;
    default:
      return state;
  }
}