import * as types from '../constants/ActionTypes.js';

// const initialState = [];

// =====
// SEED DATA FOR TESTING
// =====

const initialState = {};

export default function user(state = initialState, action) {
  switch (action.type) {
    case types.SET_USER:
      return action.user;
    default:
      return state;
  }
}
