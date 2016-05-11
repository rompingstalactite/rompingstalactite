import * as types from '../constants/ActionTypes.js';

const initialState = {
  toggleLike: false,
  likeCount: 0,
};

export default function toggleLike(state = initialState, action) {
  switch (action.type) {
    case types.TOGGLE_LIKE:
      console.log("state", state, "action.change", action.change);
      return Object.assign({}, state, action.change);
    default:
      return state;
  }
}
