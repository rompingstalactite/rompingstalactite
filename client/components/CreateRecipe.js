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

    let userValidation;
    !user.id ? userValidation = "*Please Sign In To Create A Recipe" : null;

    let images;
    if (recipe.images) {
      images = (
        <div
          className="thumbs"
        >
          {recipe.images.map((i, key) =>
            <div className="thumb">
              <img src={i} data-index={key} />
            </div>
          )}
        </div>
      );
    }
    let ingredients;
    if (recipe.ingredients) {
      ingredients = (
        <ol>
          {recipe.ingredients.map((i, key) =>
            <li className="input-list-item">
              <input
                type="text"
                value={i}
                data-index={key}
                className="create-input xl-input"
                onChange={(e) => updateRecipe(e, { ingredients: recipe.ingredients })}
              />
            </li>)}
        </ol>
      );
    }
    let prep_steps;
    if (recipe.prep_steps) {
      prep_steps = (
        <ol> {recipe.prep_steps.map((i, key) =>
          <li className="input-list-item">
            <input
              type="text"
              value={i}
              data-index={key}
              className="create-input xl-input"
              onChange={(e) => updateRecipe(e, { prep_steps: recipe.prep_steps })}
            />
          </li>)}
        </ol>
      )
    }
    let prep_time;
    let cook_steps;
    if (recipe.cook_steps) {
      cook_steps = (
        <ol> {recipe.cook_steps.map((i, key) =>
          <li className="input-list-item">
            <input
              type="text"
              value={i}
              data-index={key}
              className="create-input xl-input"
              onChange={(e) => updateRecipe(e, { cook_steps: recipe.cook_steps })}
            />
          </li>)}
        </ol>
      );
    }
    let finish_steps;
    if (recipe.finish_steps) {
      finish_steps = (
        <ol> {recipe.finish_steps.map((i, key) =>
          <li className="input-list-item">
            <input
              type="text"
              value={i}
              data-index={key}
              className="create-input xl-input"
              onChange={
                (e) => updateRecipe(e, { finish_steps: recipe.finish_steps })}
            />
          </li>
        )}
        </ol>
      );
    }
    let tags;
    if (recipe.tags) {
      tags = (
        <ol> {recipe.tags.map((i, key) =>
          <li className="input-list-item">
            <input
              type="text"
              value={i}
              data-index={key}
              className="create-input xl-input"
              onChange={(e) => updateRecipe(e, { tags: recipe.tags })}
            />
          </li>)}
        </ol>
      );
    }

    return (
      <div>
        <div className="edit-recipe-content">
          <form className="edit-recipe-form">
            <div className="user-validation">
              {userValidation}
            </div>

            <label for="title"><h2> Recipe Title: </h2></label>
            <input
              type="text"
              name="title"
              value={recipe.title}
              className="create-input xl-input"
              onChange={(e) => updateRecipe(e)}
            /><br />
            <h2> Images: </h2>
            {images}
            <ImageUpload />
            <div className="section">
              <div className="input-container left">
                <label><h2>Yield:</h2></label>
                <input
                  type="number"
                  name="yield"
                  value={recipe.yield}
                  className="create-input small-input"
                  onChange={(e) => updateRecipe(e)}
                />
              </div>
              <div className="input-container">
                <label><h2>Yield unit:</h2></label>
                <input
                  type="text"
                  name="yield_unit"
                  value={recipe.yield_unit}
                  className="create-input medium-input"
                  onChange={(e) => updateRecipe(e)}
                />
              </div>
            </div>
            <div className="section">
              <h2> Ingredients: </h2>
              {ingredients}
              <button
                className="btn btn-add"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  addField('ingredients');
                }}
              > Add Ingredient </button>
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  removeField('ingredients');
                }}
              > Remove Ingredient </button>
            </div>

            <div className="section">
              <h2> Prep Steps: </h2>
              {prep_steps}
              <button
                className="btn btn-add"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  addField('prep_steps');
                }}
              > Add Step </button>
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  removeField('prep_steps');
                }}
              > Remove Step </button>
            </div>

            <div className="section">
              <label><h2>Prep Time:</h2></label>
              <input
                type="text"
                name="prep_time"
                value={recipe.prep_time}
                className="create-input"
                onChange={(e) => updateRecipe(e)}
              />
            </div>

            <div className="section">
              <h2> Cook Steps: </h2>
              {cook_steps}
              <button
                className="btn btn-add"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  addField('cook_steps');
                }}
              > Add Step </button>
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  removeField('cook_steps');
                }}
              > Remove Step </button>
            </div>

            <div className="section">
              <h2>Cook Time:</h2>
              <input
                type="text"
                name="cook_time"
                value={recipe.cook_times}
                className="create-input medium-input"
                onChange={(e) => updateRecipe(e)}
              />
            </div>

            <div className="section">
              <h2> Finish Steps: </h2>
              {finish_steps}
              <button
                className="btn btn-add"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  addField('finish_steps');
                }}
              > Add Step </button>
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  removeField('finish_steps');
                }}
              > Remove Step </button>
            </div>

            <div className="section">
              <h2> Tags: </h2>
              {tags}
              <button
                className="btn btn-add"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  addField('tags');
                }}
              > Add Tag </button>
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  removeField('tags');
                }}
              > Remove Tag </button>
            </div>

            <div className="section">
              <button
                className="btn btn-add"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  submitRecipe(recipe, user.id);
                }}
              > Submit </button>
            </div>

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
