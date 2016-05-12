import React, { Component} from 'react';
import { connect } from 'react-redux';
import RecipeContainer from '../../client/components/RecipeContainer.js';
import actions from '../actions/index.js';
import { fetchTrending } from '../utils/utils';

import '../scss/_dashboard.scss';


class Dashboard extends Component {
  componentDidMount() {
    const { recipesFeatured, recipesTop, handleRecipesTop } = this.props;
    handleRecipesTop();
  }

  render() {
    const { recipesFeatured, recipesTop, handleRecipesTop } = this.props;

    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
        <RecipeContainer
          className="recipes-featured"
          type="Featured Recipes"
          recipes={recipesFeatured}
        />
        <RecipeContainer
          className="recipes-top"
          type="Most Forked Recipes"
          recipes={ recipesTop }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recipesFeatured: state.recipesFeatured,
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
