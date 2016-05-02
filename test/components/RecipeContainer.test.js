const expect = require('chai').expect;
const React = require('react');
import { mount } from 'enzyme';

import RecipeContainer from '../../client/components/RecipeContainer.js';
import RecipeEntry from '../../client/components/RecipeEntry.js';

const fakeRecipes = [
  { name: 'Fake Recipe 1' },
  { name: 'Fake Recipe 2' },
  { name: 'Fake Recipe 3' },
];

const fakeTitle = 'This is the title.';

describe('<RecipeContainer />', () => {

  it('should render without problems', () => {
    const wrapper = mount(<RecipeContainer recipes={fakeRecipes} />);
    expect(wrapper.find(RecipeContainer)).to.have.length(1);
  });

  it('should render the recipe container title', () => {
    const wrapper = mount(<RecipeContainer type={fakeTitle} recipes={fakeRecipes} />);
    expect(wrapper.find('h1').text()).to.equal(fakeTitle);
  });

  it('should render all <RecipeEntry /> child components', () => {
    const wrapper = mount(<RecipeContainer recipes={fakeRecipes} />);
    expect(wrapper.find(RecipeEntry)).to.have.length(3);
  });

});
