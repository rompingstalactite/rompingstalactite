import * as types from '../constants/ActionTypes.js';

const initialState = false;

export default function toggleEdit(state = initialState, action) {
  switch(action.type) {
    case types.TOGGLE_EDIT:
      return !state;
    default:
      return state;
  }
}