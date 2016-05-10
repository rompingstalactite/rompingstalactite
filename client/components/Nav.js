import React, { Component } from 'react';
import { Link } from 'react-router';
<<<<<<< 0cd50a3ddfdf8ab75bc867e57479b4729af42956
import { connect } from 'react-redux';
=======
import '../scss/_nav.scss';
>>>>>>> clean up navbar and index.html and load .scss elements into components

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
<<<<<<< 0cd50a3ddfdf8ab75bc867e57479b4729af42956
        <h1>Navigation</h1>
        <input placeholder="Search for recipes"></input>
        {signInOut}{' '}
        <Link to="/profile">Profile</Link>{' '}
        <Link to="/recipe">Recipe</Link>{' '}
        <Link to="/search">Search</Link>{' '}
        <Link to="/create">Create</Link>
=======
        <h2>Navigation</h2>
        <div className="nav-bar">
          <input placeholder="Search for recipes"></input>
          <a href="#signin">Sign in</a>
          <a href="#signout">Sign out</a>
          <Link to="/">Index</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/recipe">Recipe</Link>
          <Link to="/search">Search</Link>
          <Link to="/create">Create</Link>
        </div>
>>>>>>> clean up navbar and index.html and load .scss elements into components
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
