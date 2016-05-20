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
        <Profile params={{id: 1}} />
      </Provider>);
  });

  it('renders without problems', () => {
    expect(wrapper.find(Profile)).to.have.length(1);
  });

  it('should display the correct username', () => {
    expect(wrapper.find('.profile-username').text()).to.equal(fakeStore.getState().profile.user.display_name);
  });

  it('should display the correct avatar', () => {
    expect(wrapper.find('.profile-avatar').html()).to.contain(fakeStore.getState().profile.user.avatar);
  });

  it('should render three recipe containers', () => {
    expect(wrapper.find(RecipeContainer)).to.have.length(2);
  })
});
