import React, { Component} from 'react';
import { connect } from 'react-redux';
import RecipeContainer from '../../client/components/RecipeContainer.js';
import actions from '../actions/index.js';
import { fetchTrending } from '../utils/utils';

import '../scss/_dashboard.scss';


class Dashboard extends Component {
  componentDidMount() {
    const { handleRecipesTop } = this.props;
    handleRecipesTop();
  }

  render() {
    const { recipesSmoothies, recipesFeatured, recipesTop } = this.props;
    return (
      <div className="dashboard container-fluid">
        <div className="row">
          <div className="col-xs-12">
            <h1 className="dashboard-title">Discover <small>the best of Forkful</small></h1>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <RecipeContainer
              className="recipes-featured"
              type="Featured Recipes"
              recipes={recipesFeatured}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <RecipeContainer
              className="recipes-top"
              type="Most Forked Recipes"
              recipes={ recipesTop }
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <RecipeContainer
              className="recipes-smoothies"
              type="Summer Appetizers"
              recipes={recipesSmoothies}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recipesFeatured: state.recipesFeatured,
    recipesSmoothies: state.recipesSmoothies,
    recipesTop: state.recipesTop,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleRecipesTop: () => fetchTrending((data) => dispatch(actions.recipesTop(data))),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
