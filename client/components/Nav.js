import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Nav extends Component {
  render() {
    const { user } = this.props;
    let signInOut;
    if (!user.id) {
      signInOut = <a href="/auth/google">Sign in with Google</a>;
    } else {
      signInOut = <a href="/auth/signout">Sign out</a>;
    }
    return (
      <div>
        <h1>Navigation</h1>
        <input placeholder="Search for recipes"></input>
        {signInOut}{' '}
        <Link to="/profile">Profile</Link>{' '}
        <Link to="/recipe">Recipe</Link>{' '}
        <Link to="/search">Search</Link>{' '}
        <Link to="/create">Create</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Nav);
