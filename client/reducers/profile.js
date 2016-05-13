import * as types from '../constants/ActionTypes.js';

const initialState = {
  user: {
    id: null,
    avatar: 'http://www.carderator.com/assets/avatar_placeholder_small.png',
    displayName: 'First Last'
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
      return Object.assign({}, state, { recipesLiked: action.recipesLiked });
    default:
      return state;
  }
};
