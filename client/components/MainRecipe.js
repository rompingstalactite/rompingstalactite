import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';

import actions from '../actions/index.js';
import { forkRecipe, fetchRecipes, fetchRecipe } from '../utils/utils';
import RecipeContainer from './RecipeContainer';
import '../scss/_main.scss';
import '../scss/_mainRecipe.scss';

import Like from './Like.js';
class MainRecipe extends Component {
  componentDidMount() {
    const { getRecipe, id } = this.props;
    if (id) {
      getRecipe(id);
    }
  }

  componentWillUpdate(nextProps) {
    const currId = this.props.id;
    const { getRecipe, id } = nextProps;
    if (+currId !== +id) {
      getRecipe(id);
    }
  }

  render() {
    const { user, navToEdit, recipe, onForkClick, historyRecipes, } = this.props;
    let forkButton;
    if (user.id) {
      forkButton = <button className="btn-fork" onClick={ onForkClick.bind(null, recipe.id, user.id) }>Fork</button>;
    } else {
      forkButton = <button className="btn-fork" disabled>Fork</button>;
    }

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

    return (
      <div>
        <div className="recipe-content">
          <div className="recipe-content-header">
            <h2 className="recipe-main-title">{recipe.title}</h2>
            {editButton}
            {forkButton}
            <Like recipeID={recipe.id} userID={user.id} />
            <div className="recipe-header-container">


              <div className="recipe-header-images">
                <div className="recipe-header-card">
                  <div className="recipe-header-main-image"><img src="http://placehold.it/350x150"/>
                    <div className="recipe-header-thumbs">
                      {recipe.images.map((image) => <div onClick={() => console.log('image clicked!')} className="recipe-header-thumb"><img className="recipe-header-thumbs-image" src={image} /></div>)}
                      
                      {/*<a href="http://google.com" className="recipe-header-thumb"><img src="http://placehold.it/50x50"/></a>
                      <a href="http://google.com" className="recipe-header-thumb"><img src="http://placehold.it/50x50"/></a>
                      <a href="http://google.com" className="recipe-header-thumb"><img src="http://placehold.it/50x50"/></a> */}
                    </div>
                  </div>
                </div>
              </div>


              <div>
                <RecipeContainer
                  className="fork-history"
                  type="Recipe History"
                  recipes={historyRecipes}
                />
              </div>
            </div>
            <h4>Servings: {recipe.yield + ' ' + recipe.yield_unit} </h4>
            <h4> tags: {recipe.tags.map(t => <a> {t} </a>)} </h4>
          </div>

          <div className="recipe-instructions">
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

const mapStateToProps = (state, ownProps) => {
  return {

    user: state.user,
    recipe: state.recipe,
    fork_history: state.recipe.fork_history || [],
    historyRecipes: state.recipe.historyRecipes,
    id: ownProps.params.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onForkClick: (recipeID, userID) => {
      forkRecipe(recipeID, userID, (newRecipe) => {
        dispatch(actions.forkRecipe(newRecipe));
        dispatch(push(`/recipe/${newRecipe.id}`));
      });
    },

    navToEdit: (user) => {
      dispatch(push('/create'));
    },

    getRecipe: (recipeID) => {
      fetchRecipe(recipeID, (recipe) => {
        dispatch(actions.setRecipe(recipe));
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
