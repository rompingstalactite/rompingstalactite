import * as types from '../constants/ActionTypes.js';

const initialState = {
  images: [],
  ingredients: [],
  prep_steps: [],
  cook_steps: [],
  finish_steps: [],
  tags: [],
};

export default function editRecipe(state = initialState, action) {
  switch(action.type) {
    case types.EDIT_RECIPE:
      return Object.assign({}, state, action.change);
    case types.ADD_FIELD:
      const newState = Object.assign({}, state);
      newState[action.change].push('a');
      return newState;
    default:
      return state;
  }
}
