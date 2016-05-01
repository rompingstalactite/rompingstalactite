const expect = require('chai').expect;
const React = require('react');
const TestUtils = require('react-addons-test-utils'); // Alternately could use the DOM API

import RecipeContainer from '../../client/components/RecipeContainer.js';

const fakeRecipes = [
  { name: 'Fake Recipe 1' },
  { name: 'Fake Recipe 2' },
  { name: 'Fake Recipe 3' },
];

describe('recipeContainer', () => {
  it('renders without problems', () => {
    const recipeContainer = TestUtils.renderIntoDocument(<RecipeContainer recipes={fakeRecipes} />);
    expect(recipeContainer).to.not.be.undefined;
  });

  it('renders all child recipes', () => {
    // TODO: Fix this test
  });

});
