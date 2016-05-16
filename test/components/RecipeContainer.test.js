const expect = require('chai').expect;
const React = require('react');
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import RecipeContainer from '../../client/components/RecipeContainer.js';
import RecipeEntry from '../../client/components/RecipeEntry.js';
import fakeStore from './fakeStore';

const fakeRecipes = [
  { name: 'Fake Recipe 1' },
  { name: 'Fake Recipe 2' },
  { name: 'Fake Recipe 3' },
];

const fakeTitle = 'This is the title.';

describe('<RecipeContainer />', () => {
  let wrapper;
  beforeEach('render RecipeContainer', () => {
    wrapper = mount(
      <Provider store={fakeStore}>
        <RecipeContainer recipes={fakeRecipes} type={fakeTitle} />
      </Provider>);
  });
  it('should render without problems', () => {
    expect(wrapper.find(RecipeContainer)).to.have.length(1);
  });

  it('should render the recipe container title', () => {
    expect(wrapper.find('h2').text()).to.equal(fakeTitle);
  });

  it('should render all <RecipeEntry /> child components', () => {
    expect(wrapper.find(RecipeEntry)).to.have.length(3);
  });

});
