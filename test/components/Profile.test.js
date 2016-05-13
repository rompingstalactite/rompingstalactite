const expect = require('chai').expect;
const React = require('react');
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import fakeStore from './fakeStore';

import Profile from '../../client/components/Profile.js';
import RecipeContainer from '../../client/components/RecipeContainer.js';

describe('<Profile />', () => {
  let wrapper;

  beforeEach('render Profile', () => {
    wrapper = mount(
      <Provider store={fakeStore}>
        <Profile />
      </Provider>);
  });

  it('renders without problems', () => {
    expect(wrapper.find(Profile)).to.have.length(1);
  });

  it('should display the correct username', () => {
    expect(wrapper.find('.profile-username').text()).to.equal(fakeStore.getState().user.displayName);
  });

  it('should display the correct avatar', () => {
    expect(wrapper.find('.profile-avatar').html()).to.contain(fakeStore.getState().user.photos[0].value);
  });

  it('should render three recipe containers', () => {
    expect(wrapper.find(RecipeContainer)).to.have.length(3);
  })
});
