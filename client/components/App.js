import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/index.js';
import { fetchCurrentUser } from '../utils/utils.js';
import '../scss/_main.scss';
import '../scss/_app.scss';

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
        <div className="footer" style={{height: '50px'}}></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = function (dispatch) {
  return {
    setUserData: () => {
      fetchCurrentUser((user) => {
        dispatch(actions.setUser(user));
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
