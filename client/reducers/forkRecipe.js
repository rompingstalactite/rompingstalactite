import * as types from '../constants/ActionTypes.js';

const initialState = false;

export default function fork(state = initialState, action) {
  switch(action.type) {
    case types.FORK_RECIPE:
      return !state;
    default:
      return state;
  }
}
