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
        { children }
        <div className="footer">
          <p className="text-muted text-center" style={{paddingTop: '10px', paddingBottom: '10px', margin: 0}}><small>Made by&nbsp;
            <a href="https://github.com/andrewh0">Andrew</a>,&nbsp;
            <a href="https://github.com/controtie">Dylan</a>,&nbsp;
            <a href="https://github.com/nemobaker">Nemo</a>, and&nbsp;
            <a href="https://github.com/thomasingalls">Thomas</a> in 2016.
            Recipes powered by <a href="http://www.yummly.com">Yummly</a>.
            Icons from <a href="http://www.thenounproject.com">The Noun Project</a>.
          </small></p>
        </div>
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
