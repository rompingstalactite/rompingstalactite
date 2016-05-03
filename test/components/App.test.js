const expect = require('chai').expect;
const React = require('react');
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import App from '../../client/components/App.js';
import RecipeContainer from '../../client/components/RecipeContainer.js';
import Profile from '../../client/components/Profile.js';
import Nav from '../../client/components/Nav.js';

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

describe('<App />', () => {
  it('should render itself and its subcomponents without problems', () => {
    const wrapper = mount(
      <Provider store={fakeStore}>
        <App />
      </Provider>);
    expect(wrapper.find(App)).to.have.length(1);
    expect(wrapper.find(RecipeContainer)).to.have.length(2);
    expect(wrapper.find(Profile)).to.have.length(1);
    expect(wrapper.find(Nav)).to.have.length(1);
  });
});
