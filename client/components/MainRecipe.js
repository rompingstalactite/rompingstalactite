import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/index.js';
import { forkRecipe, fetchRecipes } from '../utils/utils';
import RecipeContainer from './RecipeContainer';
import '../scss/_mainRecipe.scss';

class MainRecipe extends Component {
  componentDidMount() {
    const { getHistory, historyIDs } = this.props;
    getHistory(historyIDs);
  }

  render() {
    const { user, toggleEdit, handleToggleEdit, recipe, onForkClick, historyRecipes } = this.props;
    let forkButton;
    if (user.id) {
      forkButton = <button className="btn-fork" onClick={ onForkClick.bind(null, recipe.id, user.id) }>Fork</button>;
    } else {
      forkButton = <button className="btn-fork" disabled>Fork</button>;
    }

    let editButton;
    if (user.id === recipe.author && user.id !== null) {
      editButton = <button className="btn-toggle-edit" onClick={ handleToggleEdit }>Toggle Edit</button>;
    } else {
      editButton = <button className="btn-toggle-edit" disabled>Toggle Edit</button>
    }

    return (
      <div>
        <h1>THIS IS THE USER: {user.displayName}</h1>
        <h1>THIS IS THE RECIPE AUTHOR: {recipe.author}</h1>
        <h1>THIS IS THE RECIPE PARENT: {recipe.parent}</h1>
        {editButton}
        {forkButton}



        <div className="recipe-content" contentEditable={toggleEdit}>
          <div className="header">
            <h2 className="recipe-main-title">{recipe.title}</h2>

            <div className="header-images">
              <div className="recipe-images">
                {recipe.images.map((image) => <img src={image} />)}
              </div>
              <div className="fork-history">
                <p> - v.1.3 forked May 1st 2016</p>
                <p> - v.1.2 forked March 12th 2016</p>
                <p> - v.1.1 forked December 19th 2015</p>
                <p> - v.1.0 forked December 5th 2015</p>
              </div>
              <div>
                <RecipeContainer
                  className="fork-history"
                  type="Recipe History"
                  recipes={historyRecipes || []}
                />
              </div>
            </div>
            <h4>Servings: {recipe.yield + ' ' + recipe.yield_unit} </h4>
            <h4> tags: {recipe.tags.map(t => <a> {t} </a>)} </h4>
          </div>

          <div className="instructions">
            <div className="ingredients">
              <ul>
                <h4> Ingredients </h4>
                {recipe.ingredients.map((i) => <li> {i} </li>)}
              </ul>
            </div>

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
  return {
    toggleEdit: state.toggleEdit,
    user: state.user,
    recipe: state.recipe,
    historyIDs: state.recipe.historyIDs,
    historyRecipes: state.recipe.historyRecipes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onForkClick: (recipeID, userID) => {
      forkRecipe(recipeID, userID, (newRecipe) => {
        dispatch(actions.forkRecipe(newRecipe));
      });
    },
    handleToggleEdit: () => dispatch(actions.toggleEdit()),
    getHistory: (recipeIDList) => {
      fetchRecipes(recipeIDList, (recipes) => {
        dispatch(actions.setRecipeHistory(recipes));
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainRecipe);

// swap out the div on line 9 once state is added to redux store
// <div contentEditable={props.editable}>
