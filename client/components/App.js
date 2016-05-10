import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/index.js';
import { fetchUser } from '../utils/utils.js';

// import '../scss/app.scss';

import Nav from './Nav.js';

class App extends Component {

  componentDidMount() {
    const { setUserData } = this.props;
    setUserData();
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        <Nav />
        <div>{ children }</div>
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    recipesOwned: state.recipesOwned,
    recipesFollowed: state.recipesFollowed,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    setUserData: () => {
      fetchUser((user) => {
        dispatch(actions.setUser(user));
      });
    },
  };
};

App.propTypes = {
  recipesOwned: PropTypes.array.isRequired,
  recipesFollowed: PropTypes.array.isRequired,
  // profile: PropTypes.shape({
  //   avatar: PropTypes.string,
  //   username: PropTypes.string,
  // }).isRequired,
  // toggleEdit: PropTypes.bool.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
