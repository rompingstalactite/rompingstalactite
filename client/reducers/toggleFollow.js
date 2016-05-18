import * as types from '../constants/ActionTypes.js';

const initialState = {
  toggleFollow: false,
  followCount: 0,
};

export default function toggleFollow(state = initialState, action) {
  switch (action.type) {
    case types.TOGGLE_FOLLOW:
      return Object.assign({}, state, action.change);
    default:
      return state;
  }
}
