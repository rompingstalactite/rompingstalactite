const expect = require('chai').expect;
const React = require('react');
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import RecipeEntry from '../../client/components/RecipeEntry.js';
import fakeStore from './fakeStore';

const recipe = { title: 'Recipe Title' };

describe('<RecipeEntry />', () => {
  let wrapper;
  beforeEach('render Profile', () => {
    wrapper = mount(
      <Provider store={fakeStore}>
        <RecipeEntry recipe={recipe} />
      </Provider>);
  });
  it('should render without problems', () => {
    expect(wrapper.find(RecipeEntry)).to.have.length(1);
  });

  it('should display the recipe name', () => {
    expect(wrapper.find('.recipe-entry-title').text()).to.equal(recipe.title);
  });
});
