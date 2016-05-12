const expect = require('chai').expect;
const React = require('react');
import { Provider } from 'react-redux';

import MainRecipe from '../../client/components/MainRecipe.js';
import actions from '../../client/actions/index.js';
import { mount } from 'enzyme';

import fakeStore from './fakeStore';

describe('<MainRecipe />', () => {
  // declare 'wrapper' in closure to have access for testing below.
  let wrapper;

  beforeEach('render recipe', () => {
    wrapper = mount(
      <Provider store={fakeStore}>
        <MainRecipe params={{id: 1}}/>
      </Provider>
    );
  });

  it('initially renders in non-editable state', () => {
    expect(wrapper).to.not.be.undefined;
    expect(wrapper.find('.recipe-content').prop('contentEditable')).to.equal(false);
  });

  it('has an action called toggleEdit', () => {
    expect(actions.toggleEdit).to.not.be.undefined;
    expect(actions.toggleEdit().type).to.equal('TOGGLE_EDIT');
  });

  it('does not toggle "contentEditable" field on button click when not logged in', () => {
    expect(wrapper.find('.btn-toggle-edit')).to.not.be.undefined;
    wrapper.find('.btn-toggle-edit').simulate('click');
    expect(wrapper.find('.recipe-content').prop('contentEditable')).to.equal(false);
    wrapper.find('.btn-toggle-edit').simulate('click');
    expect(wrapper.find('.recipe-content').prop('contentEditable')).to.equal(false);
  });

  it('has an action called forkRecipe', () => {
    expect(actions.forkRecipe).to.not.be.undefined;
    expect(actions.forkRecipe().type).to.equal('FORK_RECIPE');
  });

  it('displays the recipe title', () => {
    expect(wrapper.find('.recipe-main-title').html()).to.contain(fakeStore.getState().recipe.title);
  });

  it('displays the recipe procedures', () => {
    expect(wrapper.find('.cook').find('li').length).to.equal(fakeStore.getState().recipe.cook_steps.length);
  });

});
