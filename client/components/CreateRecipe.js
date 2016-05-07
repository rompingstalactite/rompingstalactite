import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/index.js';

export class CreateRecipe extends Component {
  constructor(props) {
    super(props);
  }
  // actions.editRecipe can accept an object whose prop name we modify in state
  // or just the name of a prop in state we want to add an empty entry to.
  updateRecipe(event) {
    const inputChange = {};
    inputChange[event.target.name] = event.target.value;
    return actions.editRecipe(inputChange);
  }

  addField(property) {
    // modify the recipe state to render a new field.
    return actions.addField(property);
  }

  render() {
    const { dispatch, recipe, } = this.props;
    return (
      <div>
        <div className="recipe-content">
          <form>
            # of spots in ingredients: {recipe.ingredients.length}
            <input
              type="text"
              name="title"
              value={recipe.title}
              onChange={(e) => dispatch(this.updateRecipe(e))}
            /><br />
            Images:
            <br />
            yield:
            <input
              type="text"
              name="yield"
              value={recipe.yield}
              onChange={(e) => dispatch(this.updateRecipe(e))}
            /><br />
            yield_unit:
            <input
              type="text"
              name="yield_unit"
              value={recipe.yield_unit}
              onChange={(e) => dispatch(this.updateRecipe(e))}
            /><br />
            ingredients:
            {recipe.ingredients.map((ingredient, i) => {
              <input
                type="text"
                name="ingredients"
                key={i}
                value={ingredient}
                onChange={(e) => dispatch(this.addField(e))}
              >
              <br />
              </input>
            })}
            <button onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              dispatch(this.addField('ingredients'));
            }}> add step </button> <br />
            prep_time:
            <input
              type="text"
              name="prep_time"
              value={recipe.prep_time}
              onChange={(e) => dispatch(this.updateRecipe(e))}
            /><br />
            prep_steps:
            <input
              type="text"
              name="prep_steps"
              value={recipe.prep_steps}
              onChange={(e) => dispatch(this.updateRecipe(e))}
            /><br />
            <button > add step </button> <br />
            cook_time:
            <input
              type="text"
              name="cook_time"
              value={recipe.cook_steps}
              onChange={(e) => dispatch(this.updateRecipe(e))}
            /><br />
            cook_steps:
            <input
              type="text"
              name="cook_steps"
              value={recipe.cook_steps}
              onChange={(e) => dispatch(this.updateRecipe(e))}
            /><br />
            <button > add step </button> <br />
            finish_steps:
            <input
              type="text"
              name="finish_steps"
              value={recipe.finish_steps}
              onChange={(e) => dispatch(this.updateRecipe(e))}
            /><br />
            <button > add step </button> <br />
            tags:
            <input
              type="text"
              name="tags"
              value={recipe.tags}
              onChange={(e) => dispatch(this.updateRecipe(e))}
            /><br />
            <button> Submit </button> <br />

          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { recipe: state.recipe };
};

export default connect(mapStateToProps)(CreateRecipe);

// swap out the div on line 9 once state is added to redux store
// <div contentEditable={props.editable}>