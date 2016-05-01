const expect = require('chai').expect;
const React = require('react');
const TestUtils = require('react-addons-test-utils'); // Alternately could use the DOM API

import RecipeEntry from '../../client/components/RecipeEntry.js';

const recipe = { name: 'Recipe Name' };

describe('recipeEntry', () => {
  it('renders without problems', () => {
    const recipeEntry = TestUtils.renderIntoDocument(<RecipeEntry recipe={recipe} />);
    expect(recipeEntry).to.not.be.undefined;
  });
});
