import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/index.js';
import { createRecipe } from '../utils/utils.js';
import '../scss/_createRecipe.scss';

class CreateRecipe extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { recipe, addField, removeField, updateRecipe } = this.props;
    return (
      <div>
        <div className="edit-recipe-content">
          <form>
            <h3> Recipe Title: </h3>
            <input
              type="text"
              name="title"
              value={recipe.title}
              onChange={(e) => updateRecipe(e)}
            /><br />
            <h3> Images: </h3>
            <br /> 
            yield:
            <input
              type="text"
              name="yield"
              value={recipe.yield}
              onChange={(e) => updateRecipe(e)}
            /><br />
            yield_unit:
            <input
              type="text"
              name="yield_unit"
              value={recipe.yield_unit}
              onChange={(e) => updateRecipe(e)}
            /><br />


            <h3> Ingredients: </h3>
            <h3> {recipe.ingredients.map((i, key) =>
              <input
                type="text"
                value={i}
                data-index={key}
                onChange={(e) => updateRecipe(e, recipe.ingredients)}
              >
              </input>)}
            </h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                addField('ingredients');
              }}
            > add ingredient </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                removeField('ingredients');
              }}
            > remove ingredient </button> <br />


            <h3> Prep Steps: </h3>
            <h3> {recipe.prep_steps.map((i, key) =>
              <input
                type="text"
                value={i}
                data-index={key}
                onChange={(e) => updateRecipe(e, recipe.prep_steps)}
              >
              </input>)}
            </h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                addField('prep_steps');
              }}
            > add Step </button> <br />
            Prep Time:
            <input
              type="text"
              name="prep_time"
              value={recipe.prep_time}
              onChange={(e) => updateRecipe(e)}
            /><br />


            <h3> Cook Steps: </h3>
            <h3> {recipe.cook_steps.map((i, key) =>
              <input
                type="text"
                value={i}
                data-index={key}
                onChange={(e) => updateRecipe(e, recipe.cook_steps)}
              >
              </input>)}
            </h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                addField('cook_steps');
              }}
            > add Step </button> <br />
            Cook Time:
            <input
              type="text"
              name="cook_time"
              value={recipe.cook_steps}
              onChange={(e) => updateRecipe(e)}
            /><br />


            <h3> Finish Steps: </h3>
            <h3> {recipe.finish_steps.map((i, key) =>
              <input
                type="text"
                value={i}
                data-index={key}
                onChange={
                  (e) => updateRecipe(e, recipe.finish_steps)}
              >
              </input>
            )}
            </h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                addField('finish_steps');
              }}
            > add Step </button> <br />

            <h3> Tags: </h3>
            <h3> {recipe.tags.map((i, key) =>
              <input
                type="text"
                value={i}
                data-index={key}
                onChange={(e) => updateRecipe(e, recipe.tags)}
              >
              </input>)}
            </h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                addField('tags');
              }}
            > add Step </button> <br />

            <button onClick={() => createRecipe(recipe, console.log)}> Submit </button>

          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { recipe: state.recipe };
};

const mapDispatchToProps = (dispatch) => {
  const updateRecipe = (event, list) => {
    let inputChange = {};
    // if a list is defined, we must modify an array position, not just reassign props.
    if (list) {
      const index = event.target.dataset.index;
      inputChange = list;
      inputChange[index] = event.target.value;
    } else {
      inputChange[event.target.name] = event.target.value;
    }
    dispatch(actions.editRecipe(inputChange));
  };
  const addField = (property) => {
    // modify the recipe state to render a new field.
    dispatch(actions.addField(property));
  };
  const removeField = (property) => {
    // modify the recipe state to render a new field.
    dispatch(actions.removeField(property));
  };

  return {
    updateRecipe,
    addField,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateRecipe);