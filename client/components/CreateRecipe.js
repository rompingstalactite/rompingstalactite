import React, { Component } from 'react';
import ImageUpload from './ImageUpload.js';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import actions from '../actions/index.js';
import { createRecipe, editRecipe } from '../utils/utils.js';
import '../scss/_createRecipe.scss';

class CreateRecipe extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, recipe, addField, removeField, updateRecipe, submitRecipe } = this.props;
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
            {recipe.images.map((i, key) =>
              <img src={i} data-index={key} />
            )}

            <ImageUpload />

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
                onChange={(e) => updateRecipe(e, { ingredients: recipe.ingredients })}
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
                onChange={(e) => updateRecipe(e, { prep_steps: recipe.prep_steps })}
              >
              </input>)}
            </h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                addField('prep_steps');
              }}
            > add Step </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                removeField('prep_steps');
              }}
            > remove Step </button>
            <br />
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
                onChange={(e) => updateRecipe(e, { cook_steps: recipe.cook_steps })}
              >
              </input>)}
            </h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                addField('cook_steps');
              }}
            > add Step </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                removeField('cook_steps');
              }}
            > remove Step </button>
            <br />
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
                  (e) => updateRecipe(e, { finish_steps: recipe.finish_steps })}
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
            > add Step </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                removeField('finish_steps');
              }}
            > remove Step </button>
            <br />

            <h3> Tags: </h3>
            <h3> {recipe.tags.map((i, key) =>
              <input
                type="text"
                value={i}
                data-index={key}
                onChange={(e) => updateRecipe(e, { tags: recipe.tags })}
              >
              </input>)}
            </h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                addField('tags');
              }}
            > add Tag </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                removeField('tags');
              }}
            > remove Tag </button>
            <br />

            <button 
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                submitRecipe(recipe, user.id);
              }}
            > Submit </button>

          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recipe: state.recipe,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  const updateRecipe = (event, list) => {
    let inputChange = {};
    // if a list is defined, we must modify an array position, not just reassign props.
    if (list) {
      const index = event.target.dataset.index;
      inputChange = list;
      for (let each in inputChange) {
        inputChange[each][index] = event.target.value;
      }
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
  // will add or submit edits to a given recipe
  const submitRecipe = (recipe, userID) => {
    if (recipe.id) { // if there is a recipe ID currently assigned, send update to an existing recipe
      editRecipe(recipe, (updatedRecipe) => {
        dispatch(actions.setRecipe(updatedRecipe));
        dispatch(push(`/recipe/${updatedRecipe.id}`));
      });
    } else { // else create a new recipe
      const newRecipe = Object.assign({}, recipe, { author: userID });
      createRecipe(newRecipe, (submittedRecipe) => {
        dispatch(actions.setRecipe(submittedRecipe));
        dispatch(push(`/recipe/${submittedRecipe.id}`));
      });
    }
  };
  return {
    updateRecipe,
    addField,
    removeField,
    submitRecipe,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateRecipe);