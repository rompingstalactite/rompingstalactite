import * as types from '../constants/ActionTypes.js';

const initialState = 'http://placehold.it/350x150';

export default function profile(state = initialState, action) {
  switch (action.type) {
    case types.SET_MAIN_RECIPE_IMAGE:
      return action.change;
    default:
      return state;
  }
}
