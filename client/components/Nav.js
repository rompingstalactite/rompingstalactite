import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { searchRecipes } from '../utils/utils.js';
import '../scss/_nav.scss';

class Nav extends Component {
  render() {
    const { user, avatar, search, recipeID, } = this.props;
    let { searchString } = this.props;
    let signInOut;
    if (!user.id) {
      signInOut = <a href="/auth/google">Sign in with Google</a>;
    } else {
      signInOut = <a href="/auth/signout">Sign out</a>;
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
          {signInOut}
          <Link to={`/recipe/${recipeID}`}>Recipe</Link>
          <Link to="/search">Search</Link>
          <Link to="/create">Create</Link>
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
    searchString: '',
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    search: (query) => {
      searchRecipes(query, (results) => {
        console.log(results);
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
