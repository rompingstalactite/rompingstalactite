const expect = require('chai').expect;
const React = require('react');
import { mount } from 'enzyme';

import RecipeEntry from '../../client/components/RecipeEntry.js';

const recipe = { title: 'Recipe Title' };

describe('<RecipeEntry />', () => {
  it('should render without problems', () => {
    const wrapper = mount(<RecipeEntry recipe={recipe} />);
    expect(wrapper.find(RecipeEntry)).to.have.length(1);
  });

  it('should display the recipe name', () => {
    const wrapper = mount(<RecipeEntry recipe={recipe} />);
    expect(wrapper.find('.recipe-title').text()).to.equal(recipe.title);
  });
});
