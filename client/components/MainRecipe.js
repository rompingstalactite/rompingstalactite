import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';

import actions from '../actions/index.js';
import { forkRecipe, fetchRecipes, fetchRecipe, fetchUser } from '../utils/utils';
import RecipeContainer from './RecipeContainer';
import Fork from './Fork';
import ForkHistoryVis from './ForkHistoryVis';
import '../scss/_main.scss';
import '../scss/_mainRecipe.scss';

import Like from './Like.js';
import Follow from './Follow.js';
class MainRecipe extends Component {
  componentDidMount() {
    const { getRecipe, id, setMainRecipeImage, recipe, setRecipeOwner } = this.props;
    if (id) {
      getRecipe(id, setMainRecipeImage, setRecipeOwner);
    }
  }

  componentWillUpdate(nextProps) {
    const currId = this.props.id;
    const { getRecipe, id, setMainRecipeImage, setRecipeOwner } = nextProps;
    if (+currId !== +id) {
      getRecipe(id, setMainRecipeImage, setRecipeOwner);
    }
  }

  render() {
    const { user, navToEdit, navToProfile, recipe, historyRecipes, setMainRecipeImage, mainRecipeImage, recipeOwner, toggleParentSteps } = this.props;

    let editButton;
    if (user.id === recipe.author && user.id !== null) {
      editButton = <button
      className="btn-toggle-edit"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        navToEdit(user);
      }}>Edit Recipe</button>;
    } else {
      editButton = <button className="btn-toggle-edit" disabled>Edit Recipe</button>
    }

    let recipeImages;
    if (recipe.images) {
      recipeImages = (
        <div className="recipe-header-thumbs">
          {recipe.images.map((image) =>
            <div onClick={() => setMainRecipeImage(image)} className="recipe-header-thumb">
              <img className="recipe-header-thumbs-image" src={image} />
            </div>)}
        </div>);
    }

    let recipeTags;

    if (recipe.tags) {
      recipeTags = (
        <h4> tags: {recipe.tags.map(t => <Link
          to={`/recipe/${t}`}
          className="recipe-entry-title"
        >{t}</Link>)} </h4>
      );
    }

    let recipeIngredients;
    if (recipe.ingredients) {
      recipeIngredients = (
        <div className="ingredients">
          <h4>Ingredients</h4>
          <ul>
            {recipe.ingredients.map((i) => <li> {i} </li>)}
          </ul>
        </div>
      );
    }

    let recipePrep;
    if (recipe.prep_steps) {
      recipePrep = (
        <div className="prep">
          <h4> Prep | Time: {recipe.prep_time} </h4>
          <ol>
            {recipe.prep_steps.map((s) => <li> {s} </li>)}
          </ol>
        </div>
      );
    }

    let recipeCook;
    if (recipe.cook_steps) {
      recipeCook = (
        <div className="cook">
          <h4> Cook | Time: {recipe.cook_time} </h4>
          <ol>
          { recipe.cook_steps.map((s) => <li> {s} </li>)}
          </ol>
        </div>
      );
    }

    let recipeFinish;
    if (recipe.finish_steps) {
      recipeFinish = (
        <div className="finish">
          <h4> Finish </h4>
          <ol>
          { recipe.finish_steps.map((s) => <li> {s} </li>)}
          </ol>
        </div>
      );
    }

    let parentRecipeIngredients;
    let parentRecipePrep;
    let parentRecipeCook;
    let parentRecipeFinish;
    let compareParentButton;


    //PARENT RECIPE LOGIC
    if (recipe.parentRecipe) {

      if (recipe.parentRecipe.ingredients) {
        compareParentButton = <button
        className="btn-compare-parent"
        onClick={toggleParentSteps} >Compare to Parent</button>;
      } else {
        compareParentButton = <button className="btn-compare-parent" disabled>Compare to Parent</button>
      }

      if (recipe.parentRecipe.ingredients) {
        parentRecipeIngredients = (
          <div className="ingredients">
            <h4>Ingredients</h4>
            <ul>
              {recipe.parentRecipe.ingredients.map((ingredient, i) => recipe.ingredients[i] === ingredient ?  <li> {ingredient} </li> :  <li className="changedParentItem"> {ingredient} </li>)}
            </ul>
          </div>
        );
      }


      if (recipe.parentRecipe.prep_steps) {
        parentRecipePrep = (
          <div className="prep">
            <h4> Prep | Time: {recipe.parentRecipe.prep_time} </h4>
            <ol>
              {recipe.parentRecipe.prep_steps.map((s) => <li> {s} </li>)}
            </ol>
          </div>
        );
      }

      if (recipe.parentRecipe.cook_steps) {
        parentRecipeCook = (
          <div className="cook">
            <h4> Cook | Time: {recipe.parentRecipe.cook_time} </h4>
            <ol>
            { recipe.parentRecipe.cook_steps.map((s) => <li> {s} </li>)}
            </ol>
          </div>
        );
      }

      if (recipe.parentRecipe.finish_steps) {
        parentRecipeFinish = (
          <div className="finish">
            <h4> Finish </h4>
            <ol>
            { recipe.parentRecipe.finish_steps.map((s) => <li> {s} </li>)}
            </ol>
          </div>
        );
      }
  }

    let parentSteps;
    if (recipe.showParentSteps) {
      parentSteps = (
        <div className="parent-recipe-instructions">
          {parentRecipeIngredients}
          {parentRecipePrep}
          {parentRecipeCook}
          {parentRecipeFinish}
        </div>
      )
    }
    return (
      <div>
        <div className="recipe-content">
          <div className="recipe-content-header">
            <div className="recipe-header-meta">
              <div className="recipe-header-names">
                <p className="recipe-main-author" onClick={() => navToProfile(recipe.author)}>{recipeOwner}</p>
                <p className="recipe-main-split">/</p>
                <p className="recipe-main-title"> {recipe.title}</p>
              </div>
              <div className="recipe-header-buttons">
                {editButton}
                {compareParentButton}
                <Fork recipeID={recipe.id} />
                <Like className="recipe-main-likes" recipeID={recipe.id} />
                <Follow parent={recipe} />
              </div>
            </div>
            <div className="recipe-header-container">
              <div className="recipe-header-card">
                <div className="recipe-header-main-image">
                  <img src={mainRecipeImage} />

                  {recipeImages}
                </div>
                <h4>Servings: {recipe.yield + ' ' + recipe.yield_unit} </h4>
                {recipeTags}
              </div>
              <div className="recipe-header-fork-history">
                <ForkHistoryVis recipe={recipe} history={historyRecipes} />
                <RecipeContainer
                  className="fork-history"
                  type="Recipe History"
                  recipes={historyRecipes}
                />
              </div>
            </div>
          </div>

          <div className="recipe-instructions-parent">
            {parentSteps}
          </div>

          <div className="recipe-instructions">
            {recipeIngredients}
            {recipePrep}
            {recipeCook}
            {recipeFinish}
          </div>

          <div className="documentation">
            <h2> Documentation </h2>
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    recipe: state.recipe,
    mainRecipeImage: state.mainRecipeImage,
    recipeOwner: state.recipeOwner,
    fork_history: state.recipe.fork_history || [],
    historyRecipes: state.recipe.historyRecipes,
    id: ownProps.params.id,
    followState: null,
    likeState: null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    navToEdit: () => {
      dispatch(push('/create'));
    },

    navToProfile: (userID) => {
      dispatch(push(`/profile/${userID}`));
    },

    setMainRecipeImage: (imageURL) => {
      if (imageURL) {
        dispatch(actions.setMainRecipeImage(imageURL));
      }
    },

    setRecipeOwner: (authorID) => {
      fetchUser(authorID, (user) => {
        dispatch(actions.setRecipeOwner(user.display_name));
      });
    },

    toggleParentSteps: () => {
      dispatch(actions.toggleParentSteps());
    },

    getRecipe: (recipeID, setRecipeImage, setRecipeOwner) => {
      fetchRecipe(recipeID, (recipe) => {
        dispatch(actions.setRecipe(recipe));
        if (recipe.parent) {
          fetchRecipe(recipe.parent, (parentRecipe) => {
            dispatch(actions.setParentRecipe(parentRecipe));
          });
        }
        setRecipeImage(recipe.images[0]);
        setRecipeOwner(recipe.author);
        fetchRecipes(recipe.fork_history, (recipes) => {
          dispatch(actions.setRecipeHistory(recipes));
        });
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainRecipe);
