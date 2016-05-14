import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { searchRecipes } from '../utils/utils.js';
import actions from '../actions/index.js';
import { push } from 'react-router-redux';
import { EMPTY_RECIPE } from '../constants/EmptyRecipe.js';
import '../scss/_nav.scss';

class Nav extends Component {
  render() {
    const { user, avatar, search, recipeID, navToCreate } = this.props;
    let { searchString } = this.props;
    let signInOut, linkToProfile;
    if (!user.id) {
      signInOut = <a href="/auth/google">Sign in with Google</a>;
    } else {
      signInOut = <a href="/auth/signout">Sign out</a>;
      linkToProfile = (
        <Link to={`/profile/${user.id}`}>
          <img className="avatar" src={avatar} alt="avatar"></img>
        </Link>);
    }
    return (
      <div>
        <div className="nav-bar">
          <Link to="/">GitCooking</Link>
          <input
            className="search-bar"
            placeholder="Search for recipes"
            onChange={(e) => { searchString = e.target.value; }}
          ></input>
          <button
            onClick={
              (e) => {
                e.preventDefault();
                e.stopPropagation();
                search(searchString);
              }
            }
          > Search </button>
          <Link to={`/recipe/${recipeID}`}>Recipe</Link>
          <Link to="/search">Search</Link>
          <Link to="/create">Create</Link>
          {signInOut}
          {linkToProfile}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navToCreate();
            }}> Create
          </button>
          <Link to="/profile">
            <img className="avatar" src={avatar} alt="avatar">
            </img>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    avatar: state.user.photos[0].value,
    recipeID: state.recipe.id,
    // map a local variable to props
    searchString: '',
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    search: (query) => {
      searchRecipes(query, (recipeArray) => {
        dispatch(actions.setRecipeList(recipeArray));
        dispatch(push('/search'));
      });
    },
    navToCreate: () => {
      dispatch(actions.setRecipe(EMPTY_RECIPE));
      dispatch(push('/create'));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
