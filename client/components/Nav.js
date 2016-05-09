import React, { Component } from 'react';
import { Link } from 'react-router';

class Nav extends Component {
  render() {
    return (
      <div>
        <h1>Navigation</h1>
        <input placeholder="Search for recipes"></input>
        <a href="/auth/google">Sign in with Google</a>{' '}
        {/*<a href="/signin">Sign in with Facebook</a>{' '}*/}
        <a href="/auth/signout">Sign out</a>{' '}
        <Link to="/">Index</Link>{' '}
        <Link to="/profile">Profile</Link>{' '}
        <Link to="/recipe">Recipe</Link>{' '}
        <Link to="/search">Search</Link>{' '}
        <Link to="/create">Create</Link>
      </div>
    );
  }
}

export default Nav;
