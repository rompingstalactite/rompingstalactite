import React from 'react';
import { connect } from 'react-redux';
import RecipeContainer from '../../client/components/RecipeContainer.js';
import '../scss/_search.scss';

const SearchResults = (props) => (
  <div className="search-results container">
    <div className="row">
      <div className="col-xs-12">
        <RecipeContainer
          className="recipes-searched"
          type="Search Results"
          recipes={props.recipesSearched}
        />
      </div>
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    recipesSearched: state.recipesSearched,
  };
};

export default connect(mapStateToProps)(SearchResults);
