import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/index.js';
import '../scss/app.scss';

import Nav from '../../client/components/Nav.js';
import Profile from '../../client/components/Profile.js';
import RecipeContainer from '../../client/components/RecipeContainer.js';

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Profile profile={{ avatar: 'http://www.carderator.com/assets/avatar_placeholder_small.png', username: 'USERNAME' }} />
        <RecipeContainer
          recipes={[
            { name: 'Owned Recipe 1' },
            { name: 'Owned Recipe 2' },
            { name: 'Owned Recipe 3' }]}
        />
        <RecipeContainer
          recipes={[
            { name: 'Saved Recipe 1' },
            { name: 'Saved Recipe 2' },
            { name: 'Saved Recipe 3' }]}
        />
      </div>
    );
  }
}

export default App;
