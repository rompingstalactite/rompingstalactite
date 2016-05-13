import * as types from '../constants/ActionTypes.js';

const initialState = {};

export default function profile(state = initialState, action) {
  switch (action.type) {
    case types.SET_PROFILE:
      return action.profile;
    default:
      return state;
  }
};
