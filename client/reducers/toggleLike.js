import * as types from '../constants/ActionTypes.js';

const initialState = {
  toggleLike: false,
  likeCount: 0,
};

export default function toggleLike(state = initialState, action) {
  switch (action.type) {
    case types.TOGGLE_LIKE:
      return Object.assign({}, state, action.change);
    default:
      return state;
  }
}
