import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/index.js';
// import '../scss/app.scss';

import Nav from './Nav.js';
import MainRecipe from './MainRecipe.js';
import Profile from './Profile.js';
import RecipeContainer from './RecipeContainer.js';

class App extends Component {
  render() {
    const { profile, recipesOwned, recipesFollowed, toggleEdit } = this.props;
    return (
      <div>
        <MainRecipe />
        <Nav />
        <Profile profile={profile} />
        <h1>Dashboard</h1>
        <RecipeContainer
          className="recipes-owned"
          type="My Owned Recipes"
          recipes={recipesOwned}
        />
        <RecipeContainer
          className="recipes-followed"
          type="My Followed Recipes"
          recipes={recipesFollowed}
        />
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    profile: state.profile,
    recipesOwned: state.recipesOwned,
    recipesFollowed: state.recipesFollowed,
    toggleEdit: state.toggleEdit,
  };
};

// const mapDispatchToProps = function (dispatch) {
//   return {
//    // fill in any actions here
//   };
// };

App.propTypes = {
  recipesOwned: PropTypes.array.isRequired,
  recipesFollowed: PropTypes.array.isRequired,
  profile: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
  toggleEdit: PropTypes.bool.isRequired,
};

export default connect(
  mapStateToProps
  // mapDispatchToProps,
)(App);
