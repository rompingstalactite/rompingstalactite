const expect = require('chai').expect;
const React = require('react');
const TestUtils = require('react-addons-test-utils'); // Alternately could use the DOM API

import Profile from '../../client/components/Profile.js';

describe('profile', () => {
  it('renders without problems', () => {
    const profile = TestUtils.renderIntoDocument(<Profile />);
    expect(profile).to.not.be.undefined;
  });
});
