import React from 'react';
import { connect } from 'react-redux';
import RecipeContainer from '../../client/components/RecipeContainer.js';
import '../scss/_dashboard.scss';

const Dashboard = (props) => (
  <div className="dashboard">
    <h1>Dashboard</h1>
    <RecipeContainer
      className="recipes-featured"
      type="Featured Recipes"
      recipes={props.recipesFeatured}
    />
    <RecipeContainer
      className="recipes-top"
      type="Most Forked Recipes"
      recipes={props.recipesTop}
    />
  </div>
);

const mapStateToProps = (state) => {
  return {
    recipesFeatured: state.recipesFeatured,
    recipesTop: state.recipesTop,
  };
};

export default connect(mapStateToProps)(Dashboard);
