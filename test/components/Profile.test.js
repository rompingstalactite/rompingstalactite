const expect = require('chai').expect;
const React = require('react');
const TestUtils = require('react-addons-test-utils'); // Alternately could use the DOM API

import Profile from '../../client/components/Profile.js';

const fakeProfile = {
  avatar: 'http://www.carderator.com/assets/avatar_placeholder_small.png',
  username: 'USERNAME',
};

describe('profile', () => {
  it('renders without problems', () => {
    const profile = TestUtils.renderIntoDocument(<Profile profile={fakeProfile} />);
    expect(profile).to.not.be.undefined;
  });
});
