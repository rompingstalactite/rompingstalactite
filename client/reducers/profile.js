import * as types from '../constants/ActionTypes.js';

const initialState = {
  user: {
    id: null,
    avatar: 'http://www.carderator.com/assets/avatar_placeholder_small.png',
    displayName: 'First Last'
  },
  recipesCreated: [],
  recipesFollowed: [],
  recipesLiked: [],
};

export default function profile(state = initialState, action) {
  switch (action.type) {
    case types.SET_PROFILE_USER:
      return Object.assign({}, state, { user: action.user });
    case types.SET_PROFILE_RECIPES_CREATED:
      return Object.assign({}, state, { recipesCreated: action.recipesCreated });
    case types.SET_PROFILE_RECIPES_FOLLOWED:
      return Object.assign({}, state, { recipesFollowed: action.recipesFollowed });
    case types.SET_PROFILE_RECIPES_LIKED:
      return Object.assign({}, state, { recipesLiked: action.recipesLiked });
    default:
      return state;
  }
};
