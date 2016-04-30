const expect = require('chai').expect;
const React = require('react');
const TestUtils = require('react-addons-test-utils'); // Alternately could use the DOM API

import RecipeEntry from '../../client/components/RecipeEntry.js';

describe('recipeEntry', () => {
  it('renders without problems', () => {
    const recipeEntry = TestUtils.renderIntoDocument(<RecipeEntry />);
    expect(recipeEntry).to.not.be.undefined;
  });
});
