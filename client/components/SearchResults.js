import React from 'react';
import { connect } from 'react-redux';
import RecipeContainer from '../../client/components/RecipeContainer.js';

const SearchResults = (props) => (
  <div className="search-results">
    <RecipeContainer
      className="recipes-searched"
      type="Search Results"
      recipes={props.recipesSearched}
    />
  </div>
);

const mapStateToProps = (state) => {
  return {
    recipesSearched: state.recipesSearched,
  };
};

export default connect(mapStateToProps)(SearchResults);
