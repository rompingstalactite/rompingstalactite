import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/index.js';

const recipe = {
  title: 'Vegan Red Velvet Cupcakes<script>console.log(\'hello\')</script>',
  images: [
    'http://40aprons.com/wp-content/uploads/2013/10/red_velvet_cupcakes+2+of+81.jpg',
    'http://cf.tasteandtellblog.com/wp-content/uploads/2014/09/Red-Velvet-Cupcakes-recipe-taste-and-tell-1b-opt.jpg',
    'http://ww2.hdnux.com/photos/13/62/31/3089985/3/920x920.jpg',
  ],
  followers: [
    'user1',
    'user2',
    'user3'
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
  prep_steps:[
    'Preheat oven to 350 degrees and line muffin pans with liners.',
  ],
  cook_time:20,
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
};

export class MainRecipe extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { toggleEdit, dispatch, /*recipe*/ } = this.props;
    return (
      <div>
        <button onClick={() => dispatch(actions.toggleEdit())}> Toggle Edit </button>
        <button onClick={() => dispatch(actions.fork())}>Fork</button>
        <div className="recipe-content" contentEditable={toggleEdit}>

          <div className="header">
            <h2 className="recipe-title">{recipe.title}</h2>
            {recipe.images.map((i) => <img src={i} />)}
            <h4>Servings: {recipe.yield + ' ' + recipe.yield_unit} </h4>
            <h4> tags: {recipe.tags.map(t => <a> {t} </a>)} </h4>
          </div>

          <div className="instructions">

            <ul className="ingredients">
            <h4> Ingredients </h4>
            {recipe.ingredients.map((i) => <li> {i} </li>)}
            </ul>

            <div className="prep">
              <h4> Prep | Time: {recipe.prep_time} </h4>
              <ol>
              {recipe.prep_steps.map((s) => <li> {s} </li>)}
              </ol>
            </div>

            <div className="cook">
              <h4> Cook | Time: {recipe.cook_time} </h4>
              <ol>
              {recipe.cook_steps.map((s) => <li> {s} </li>)}
              </ol>
            </div>

            <div className="finish">
              <h4> Finish </h4>
              <ol>
              {recipe.finish_steps.map((s) => <li> {s} </li>)}
              </ol>
            </div>
          </div>

          <div className="documentation">
            <h2> Documentation </h2>
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { toggleEdit: state.toggleEdit,
           // recipe: state.recipe
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return toggleEdit() {
//     dispatch({type: 'TOGGLE_EDIT'});
//   }
//   return { toggleEdit: state.toggleEdit };
// };

export default connect(mapStateToProps)(MainRecipe);

// swap out the div on line 9 once state is added to redux store
// <div contentEditable={props.editable}>
