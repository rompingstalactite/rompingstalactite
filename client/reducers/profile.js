import * as types from '../constants/ActionTypes.js';

const initialState = {
  user: {
    id: null,
    avatar: null,
    displayName: 'Display Name'
  },
  recipesOwned: [],
  recipesFollowed: [],
  recipesLiked: [],
};

export default function profile(state = initialState, action) {
  switch (action.type) {
    case types.SET_PROFILE_USER:
      return Object.assign({}, state, { user: action.user });
    case types.SET_PROFILE_RECIPES_OWNED:
      return action.profile;
    case types.SET_PROFILE_RECIPES_FOLLOWED:
      return action.profile;
    case types.SET_PROFILE_RECIPES_LIKED:
      return action.profile;
    default:
      return state;
  }
};
