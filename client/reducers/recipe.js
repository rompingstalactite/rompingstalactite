import * as types from '../constants/ActionTypes.js';

// =====
// SEED DATA FOR TESTING
// =====

const initialState = {
  id: 1,
  author: 1,
  display_name: null,
  parent: null,
  created_at: new Date(),
  updated_at: new Date(),
  title: 'Vegan Red Velvet Cupcakes',
  images: [
    'http://40aprons.com/wp-content/uploads/2013/10/red_velvet_cupcakes+2+of+81.jpg',
    'http://cf.tasteandtellblog.com/wp-content/uploads/2014/09/Red-Velvet-Cupcakes-recipe-taste-and-tell-1b-opt.jpg',
    'http://ww2.hdnux.com/photos/13/62/31/3089985/3/920x920.jpg',
  ],
  followers: [
    'user1',
    'user2',
    'user3',
  ],
  yield: 12,
  yield_unit: 'Cupcakes',
  ingredients: [
    '1 cup soymilk',
    '1 teaspoon apple cider vinegar',
    '1 1⁄4 cups all-purpose flour',
    '1 cup granulated sugar',
    '2 tablespoons cocoa powder',
    '1⁄2 teaspoon baking powder',
    '1⁄2 teaspoon baking soda',
    '1⁄2 teaspoon salt',
    '1⁄3 cup canola oil',
    '2 tablespoons red food coloring',
    '2 teaspoons vanilla extract',
    '1⁄4 teaspoon almond extract',
    '1 teaspoon chocolate extract',
    '1⁄4 cup vegan margarine, non-hydrogenated, softened',
    '1⁄4 cup vegan cream cheese, softened',
    '2 cups powdered sugar, sifted',
    '1 teaspoon vanilla extract',
  ],
  prep_time: 15,
  prep_steps: [
    'Preheat oven to 350 degrees and line muffin pans with liners.',
  ],
  cook_time: 20,
  cook_steps: [
    'Whisk together the soy milk and vinegar and set aside to curdle.',
    'Sift the flour, sugar, cocoa, baking powder, baking soda, and salt into a large bowl and mix.',
    'Add the oil, food coloring, chocolate extract, Vanilla extract and almond extract to the curdled soy milk. Whisk well to combine.',
    'Make well in center of dry ingredients and gently fold wet ingredients into dry, mixing until large lumps disappear.',
    'Do not over mix, or your cupcakes will turn out gummy - small lumps are okay.',
    'Fill cupcake liners about three-quarters full as these cupcakes will rise fairly high.',
    'Place in hot oven and bake 18-20 minutes until done, or until toothpick inserted in cetner comes out clean.',
    'Cool cupcakes in the pan for five mintues, and then transfer to a cooling rack or surface to cool completely.',
    'For frosting:',
    'Using a hand mixer, cream together margarine and cream cheese until just combined, then whip in the powdered sugar in 1/2 cup batches.',
    'Scrape down the sides and mix until smooth and creamy.',
    'Mix in the vanilla.',
  ],
  finish_steps: [
    'Keep tightly covered and refrigerated until ready to use.',
    'Add sprinkles/garnish if desirerd.',
  ],
  tags: [
    'vegan',
    'vegetarian',
    'dairy-free',
  ],
  fork_history: [1, 2, 3, 80],
  historyRecipes: [],
  showParentSteps: false,
};


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
