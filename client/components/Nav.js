import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import '../scss/_nav.scss';

class Nav extends Component {
  render() {
    const { user, avatar} = this.props;
    let signInOut;
    if (!user.id) {
      signInOut = <a href="/auth/google">Sign in with Google</a>;
    } else {
      signInOut = <a href="/auth/signout">Sign out</a>;
    }
    return (
      <div>
        <div className="nav-bar">
          <h3> GitCooking </h3>
          <input placeholder="Search for recipes"></input>
          {signInOut}
          <Link to="/">Index</Link>
          <Link to="/recipe">Recipe</Link>
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
  };
};

export default connect(mapStateToProps)(Nav);
