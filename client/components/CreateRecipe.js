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
    !user.id ? userValidation = "You must be signed in to create a recipe." : null;

    let createRecipeButton;
    if (user.id) {
      createRecipeButton = (
        <button
          className="btn btn-default"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            submitRecipe(recipe, user.id);
          }}
        >Create</button>
      );
    } else {
      createRecipeButton = (
        <button
          className="btn btn-default"
          disabled="disabled"
        >Create</button>
      );
    }

    let images;
    if (recipe.images) {
      images = (
        <div className="thumbs">
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
                placeholder="Ingredient"
                value={i}
                data-index={key}
                className="create-input large-input form-control"
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
              placeholder="Preparation step"
              value={i}
              data-index={key}
              className="create-input large-input form-control"
              onChange={(e) => updateRecipe(e, { prep_steps: recipe.prep_steps })}
            />
          </li>)
        }
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
              placeholder="Cook step"
              value={i}
              data-index={key}
              className="create-input large-input form-control"
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
              placeholder="Finish step"
              value={i}
              data-index={key}
              className="create-input large-input form-control"
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
              placeholder="Tag"
              value={i}
              data-index={key}
              className="create-input large-input form-control"
              onChange={(e) => updateRecipe(e, { tags: recipe.tags })}
            />
          </li>)}
        </ol>
      );
    }

    return (
      <div className="edit-recipe-content container">

        <div className="row">
          <div className="col-xs-12">
            <h1>Create <small>a new recipe</small></h1>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <form className="edit-recipe-form">


              <div className="form-group">
                <label for="title" className="control-label">Recipe title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Recipe title"
                  value={recipe.title}
                  className="form-control large-input"
                  onChange={(e) => updateRecipe(e)}
                />
              </div>

              <div className="form-group">
                <label className="control-label">Images</label><br/>
                <ImageUpload/>
                {images}
              </div>

              <div className="form-group">
                  <label for="yield" className="control-label">Yield</label>
                  <input
                    type="number"
                    name="yield"
                    placeholder="2"
                    value={recipe.yield}
                    className="create-input small-input form-control"
                    onChange={(e) => updateRecipe(e)}
                  />
              </div>

              <div className="form-group">
                  <label for="yield_unit" className="control-label">Yield unit</label>
                  <input
                    type="text"
                    name="yield_unit"
                    placeholder="Servings"
                    value={recipe.yield_unit}
                    className="create-input medium-input form-control"
                    onChange={(e) => updateRecipe(e)}
                  />
              </div>

              <div className="form-group">
                <label className="control-label">Ingredients</label>
                {ingredients}
                <button
                  className="btn btn-success"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    addField('ingredients');
                  }}
                >Add ingredient</button>
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    removeField('ingredients');
                  }}
                >Remove ingredient</button>
              </div>

              <div className="form-group">
                <label for="prep_time" className="control-label">Preparation time</label>
                <input
                  type="text"
                  name="prep_time"
                  placeholder="30 minutes"
                  value={recipe.prep_time}
                  className="create-input medium-input form-control"
                  onChange={(e) => updateRecipe(e)}
                />
              </div>

              <div className="form-group">
                <label className="control-label">Preparation steps</label>
                {prep_steps}
                <button
                  className="btn btn-success"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    addField('prep_steps');
                  }}
                >Add step</button>
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    removeField('prep_steps');
                  }}
                >Remove step</button>
              </div>

              <div className="form-group">
                <label for="cook_time" className="control-label">Cook time</label>
                <input
                  type="text"
                  name="cook_time"
                  placeholder="30 minutes"
                  value={recipe.cook_times}
                  className="create-input medium-input form-control"
                  onChange={(e) => updateRecipe(e)}
                />
              </div>

              <div className="form-group">
                <label className="control-label">Cook steps</label>
                {cook_steps}
                <button
                  className="btn btn-success"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    addField('cook_steps');
                  }}
                >Add step</button>
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    removeField('cook_steps');
                  }}
                >Remove step</button>
              </div>

              <div className="form-group">
                <label className="control-label">Finish steps</label>
                {finish_steps}
                <button
                  className="btn btn-success"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    addField('finish_steps');
                  }}
                >Add step</button>
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    removeField('finish_steps');
                  }}
                >Remove step</button>
              </div>

              <div className="form-group">
                <label className="control-label">Tags</label>
                {tags}
                <button
                  className="btn btn-success"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    addField('tags');
                  }}
                >Add tag</button>
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    removeField('tags');
                  }}
                >Remove tag</button>
              </div>

              <div className="user-validation help-block">
              {userValidation}
              </div>

              {createRecipeButton}
            </form>

          </div>
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
