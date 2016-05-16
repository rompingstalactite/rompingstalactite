import * as types from '../constants/ActionTypes.js';

const initialState = [
  {
    title: 'Red Velvet Cupcakes',
    image: 'http://40aprons.com/wp-content/uploads/2013/10/red_velvet_cupcakes+2+of+81.jpg',
    display_name: 'GitCooking Staff',
  },
  {
    title: 'Best Steak Marinade in Existence',
    image: 'http://images.media-allrecipes.com/userphotos/250x250/225844.jpg',
    display_name: 'GitCooking Staff',
  },
  {
    title: 'Couscous Primavera',
    image: 'http://images.media-allrecipes.com/userphotos/720x405/3554842.jpg',
    display_name: 'GitCooking Staff',
  },
];

export default function recipesSearched(state = initialState, action) {
  switch (action.type) {
    case types.SET_RECIPE_LIST:
      return action.change;
    default:
      return state;
  }
}
