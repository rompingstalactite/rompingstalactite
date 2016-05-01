const expect = require('chai').expect;
const React = require('react');
const TestUtils = require('react-addons-test-utils'); // Alternately could use the DOM API

import Nav from '../../client/components/Nav.js';

describe('nav', () => {
  it('renders without problems', () => {
    const nav = TestUtils.renderIntoDocument(<Nav />);
    expect(nav).to.not.be.undefined;
  });
});
