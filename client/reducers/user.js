import * as types from '../constants/ActionTypes.js';

// const initialState = [];

// =====
// SEED DATA FOR TESTING
// =====

const initialState = {
  id: null,
  displayName: null,
  photos: [{ value: 'http://www.carderator.com/assets/avatar_placeholder_small.png' }],
  gender: null,
  provider: null,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case types.SET_USER:
      return action.user;
    default:
      return state;
  }
}
