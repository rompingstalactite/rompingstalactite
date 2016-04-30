const expect = require('chai').expect;
const React = require('react');
const TestUtils = require('react-addons-test-utils'); // Alternately could use the DOM API

import RecipeContainer from '../../client/components/RecipeContainer.js';

describe('recipeContainer', () => {
  it('renders without problems', () => {
    const recipeContainer = TestUtils.renderIntoDocument(<RecipeContainer />);
    expect(recipeContainer).to.not.be.undefined;
  });
});
