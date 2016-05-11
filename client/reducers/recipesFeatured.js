// import * as types from '../constants/ActionTypes.js';

// const initialState = [];

// =====
// SEED DATA FOR TESTING
// =====

const initialState = [
  {
    title: 'Red Velvet Cupcakes',
    image: 'http://40aprons.com/wp-content/uploads/2013/10/red_velvet_cupcakes+2+of+81.jpg',
  },
  {
    title: 'Best Steak Marinade in Existence',
    image: 'http://images.media-allrecipes.com/userphotos/250x250/225844.jpg',
  },
  {
    title: 'Couscous Primavera',
    image: 'http://images.media-allrecipes.com/userphotos/720x405/3554842.jpg',
  },
];

export default function recipesFeatured(state = initialState /*, action*/) {
  // switch (action.type) {
  // case types.UPDATE_RECIPES:
  //   return state.concat(action.recipes);
  // default:
  return state;
  // }
}
