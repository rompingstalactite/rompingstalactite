const expect = require('chai').expect;
const React = require('react');
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
const TestUtils = require('react-addons-test-utils'); // Alternately could use the DOM API

import App from '../../client/components/App.js';

// Make fake initialStates
const initialStateRecipes = [
  { name: 'Followed Recipe 1' },
  { name: 'Followed Recipe 2' },
  { name: 'Followed Recipe 3' }];

const initialStateProfile = {
  avatar: 'http://www.carderator.com/assets/avatar_placeholder_small.png',
  username: 'USERNAME',
};

// Make fake reducers
const profile = (state = initialStateProfile) => state;
const recipesOwned = (state = initialStateRecipes) => state;
const recipesFollowed = (state = initialStateRecipes) => state;
const fakeRootReducer = combineReducers({ profile, recipesOwned, recipesFollowed });

const fakeStore = createStore(fakeRootReducer);

describe('app', () => {
  // before('render app', function() {
  //   var renderedComponent = TestUtils.renderIntoDocument(
  //     <App />
  //   );
  //
  //   // Searching for <input> tag within rendered React component
  //   // Throws an exception if not found
  //   // var inputComponent = TestUtils.findRenderedDOMComponentWithTag(
  //   //   renderedComponent,
  //   //   'input'
  //   // );
  //
  //   // this.inputElement = inputComponent.getDOMNode();
  // });

  it('renders without problems', () => {
    const app = TestUtils.renderIntoDocument(
      <Provider store={fakeStore}>
        <App />
      </Provider>
    );
    expect(app).to.not.be.undefined;
  });
});
