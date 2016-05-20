// import * as types from '../constants/ActionTypes.js';

// const initialState = [];

// =====
// SEED DATA FOR TESTING
// =====

const initialState = [
  {
    title: 'Indulgent Chocolate Mousse',
    image: 'https://i2.wp.com/wholefoodsimply.com/wp-content/uploads/2013/09/Gavs-Mousse.jpg?w=900&ssl=1',
    display_name: 'Forkful Staff',
    author: 1,
    created_at: new Date(2016, 4, 13),
    id: 38,
  },
  {
    title: 'Crock Pot Beer Chicken',
    image: 'http://www.laaloosh.com/wp-content/uploads/2012/07/crock-pot-beer-chicken.jpg',
    display_name: 'Forkful Staff',
    author: 1,
    created_at: new Date(2016, 2, 22),
    id: 42,
  },
  {
    title: 'Stuffed Mexican Peppers',
    image: 'http://images.media-allrecipes.com/userphotos/600x600/2508674.jpg',
    display_name: 'Forkful Staff',
    author: 1,
    created_at: new Date(2016, 1, 15),
    id: 30,
  },
  {
    title: 'Marinated Grilled Shrimp',
    image: 'http://images.media-allrecipes.com/userphotos/600x600/2374052.jpg',
    display_name: 'Forkful Staff',
    author: 1,
    created_at: new Date(2015, 12, 30),
    id: 47,
  },
  {
    title: 'Cinnamon Sugar Donut Muffins',
    image: 'http://cf.chocolatechocolateandmore.com/wp-content/uploads/2015/03/Cinnamon-Sugar-Donut-Muffins-ChocolateChocolateandmore-67.jpg',
    display_name: 'Forkful Staff',
    author: 1,
    created_at: new Date(2016, 3, 8),
    id: 45,
  },
  {
    title: 'Pancakes',
    image: 'http://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/25/69/0/picwslJ1c.jpg',
    display_name: 'Forkful Staff',
    author: 1,
    created_at: new Date(2016, 1, 29),
    id: 36,
  },
  {
    title: 'Healthy Baked Sweet Potato Fries',
    image: 'http://2.bp.blogspot.com/-MJYOo2bMUFE/U3__T1OZ5rI/AAAAAAAALuM/kkfkU6xqwEY/s1600/healthy-baked-sweet-potato-fries-h.jpg',
    display_name: 'Forkful Staff',
    author: 1,
    created_at: new Date(2016, 5, 5),
    id: 44,
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
