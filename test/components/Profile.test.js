const expect = require('chai').expect;
const React = require('react');
import { mount } from 'enzyme';

import Profile from '../../client/components/Profile.js';

const fakeProfile = {
  avatar: 'http://www.carderator.com/assets/avatar_placeholder_small.png',
  username: 'USERNAME',
};

describe('<Profile />', () => {
  it('renders without problems', () => {
    const wrapper = mount(<Profile profile={fakeProfile} />);
    expect(wrapper.find(Profile)).to.have.length(1);
  });

  it('should display the correct username', () => {
    const wrapper = mount(<Profile profile={fakeProfile} />);
    expect(wrapper.find('.profile-username').text()).to.equal(fakeProfile.username);
  });

  it('should display the correct avatar', () => {
    const wrapper = mount(<Profile profile={fakeProfile} />);
    expect(wrapper.find('.profile-avatar').html()).to.contain(fakeProfile.avatar);
  });
});
