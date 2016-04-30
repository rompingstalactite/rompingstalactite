import React, { Component } from 'react';

class Nav extends Component {
  render() {
    return (
      <div>
        <h1>Navigation</h1>
        <input placeholder="Search for recipes"></input>
        <a href="#signin">Sign in</a>
        <a href="#signout">Sign out</a>
      </div>
    );
  }
}

export default Nav;
