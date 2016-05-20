import * as types from '../constants/ActionTypes.js';
import { EMPTY_RECIPE } from '../constants/EmptyRecipe.js';

const initialState = EMPTY_RECIPE;


export default function recipe(state = initialState, action) {
  switch (action.type) {
    case types.FORK_RECIPE:
      return action.newRecipe;
    case types.SET_RECIPE:
      return action.recipe;
    case types.EDIT_RECIPE:
      const editState = Object.assign({}, state, action.change);
      return editState;
    case types.ADD_FIELD:
      const addState = Object.assign({}, state);
      addState[action.change].push('');
      return addState;
    case types.REMOVE_FIELD:
      const removedState = Object.assign({}, state);
      removedState[action.change].pop();
      return removedState;
    case types.SET_RECIPE_HISTORY:
      const newHistory = {
        historyRecipes: action.historyRecipes,
      };
      return Object.assign({}, state, newHistory);
    case types.SET_PARENT_RECIPE:
      const newParent = {
        parentRecipe: action.parentRecipe,
      }
      return Object.assign({}, state, newParent);
    case types.TOGGLE_PARENT_STEPS:
      const showParentSteps = state.showParentSteps;
      return Object.assign({}, state, {showParentSteps: !showParentSteps})
    default:
      return state;
    // case types.EDIT_RECIPE:
    // return state;

    // case types.TOGGLE_EDIT:
    // return state;
  }
}


// AJAX call to set RECIPE initial state
