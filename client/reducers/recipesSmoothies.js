
// import * as types from '../constants/ActionTypes.js';

// const initialState = [];

// =====
// SEED DATA FOR TESTING
// =====

const initialState = [
  {
    title: 'Japanese Style Wings',
    image: 'http://pictures.food.com/api/file/TuGlaMWQ5OBe6LrnaGAB-1531645_10203894315582622_620837910_n.jpg/convert?loc=/pictures.food.com/recipes/68/95/5/7YxSddiDTJWpw2LIaNQO_1531645_10203894315582622_620837910_n.jpg&width=555&height=416&fit=max&flags=progressive&quality=95',
    display_name: 'Forkful Staff',
    author: 1,
    created_at: new Date(2016, 4, 21),
    id: 11,
  },
  {
    title: 'Bahn Mi Lettuce Wraps',
    image: 'http://img.sndimg.com/food/image/upload/w_614,h_461,c_fit/v1/img/submissions/recipe/0/94QfwdbcQiyZvjuGomTu_0242675_A7%20Bahn%20Mi_04.jpg',
    display_name: 'Forkful Staff',
    author: 1,
    created_at: new Date(2016, 1, 18),
    id: 16,
  },
  {
    title: 'Roasted Asparagus and Fontina Pizza',
    image: 'http://cdn-img.health.com/sites/default/files/styles/420x420/public/styles/main/public/asparagus-pizza-XL.jpg',
    display_name: 'Forkful Staff',
    author: 1,
    created_at: new Date(2015, 11, 10),
    id: 15,
  },
  {
    title: 'Grilled Zucchini Roll-Ups With Herbs and Cheese',
    image: 'http://cdn-img.health.com/sites/default/files/styles/420x420/public/styles/main/public/grilled-zucchini-hl-1713091-x.jpg',
    display_name: 'Forkful Staff',
    author: 1,
    created_at: new Date(2016, 4, 2),
    id: 14,
  },
  {
    title: 'Silken Tofu Caesar Salad',
    image: 'http://cdn-img.health.com/sites/default/files/styles/420x420/public/styles/main/public/skinny-caesar-xl.jpg',
    display_name: 'Forkful Staff',
    author: 1,
    created_at: new Date(2015, 10, 17),
    id: 20,
  },
  {
    title: 'Butter Lettuce, Radish and Avocado Salad with Mustard Dressing',
    image: 'http://cdn-img.health.com/sites/default/files/styles/420x420/public/styles/main/public/butter-lettuce-avocado-salad-XL.jpg',
    author: 1,
    created_at: new Date(2016, 1, 8),
    id: 19,
  },
];

export default function recipesSmoothies(state = initialState /*, action*/) {
  // switch (action.type) {
  // case types.UPDATE_RECIPES:
  //   return state.concat(action.recipes);
  // default:
  return state;
  // }
}
