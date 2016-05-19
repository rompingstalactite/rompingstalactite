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
    const { user, avatar, search, recipeID, navToCreate, dispatch } = this.props;
    let { searchString } = this.props;
    let signInOut, linkToProfile;
    if (!user.id) {
      signInOut = <a class="sign-in-text" href="/auth/google">Sign In</a>;
    } else {
      signInOut = <a href="/auth/signout">Sign out</a>;
      linkToProfile = (
        <Link to={`/profile/${user.id}`}>
          <img className="avatar" src={avatar} alt="avatar"></img>
        </Link>);
    }
    return (
        <div className="nav-bar">
          <div className="nav-bar-left">
            <Link to="/">GitCooking</Link>
            <input
              className="search-bar"
              placeholder="Search for recipes"
              onChange={(e) => { searchString = e.target.value; }}
            ></input>
            <button
              style="curosr=pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                search(searchString);
              }}
            > Search </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navToCreate();
              }}> Create
            </button>
            <button>
              <a href="/dashboard">Discover</a>
            </button>
          </div>
          <div className="nav-bar-right">
              {signInOut}
              {linkToProfile}
          </div>
          {/* <Link to={`/recipe/${recipeID}`}>Recipe</Link>*/}
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
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
