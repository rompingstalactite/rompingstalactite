const expect = require('chai').expect;
const React = require('react');

import { MainRecipe } from '../../client/components/MainRecipe.js';
import { createStore } from 'redux';
import actions from '../../client/actions/index.js';
import { shallow } from 'enzyme';
import fakeRecipe from './fakeRecipe';

describe('<MainRecipe />', () => {
  // declare 'wrapper' in closure to have access for testing below.
  let wrapper;

  // create fake reducer and store
  const fakeReducer = (state = false, action) => {
    if (action.type === 'TOGGLE_EDIT') {
      return !state;
    }
    return state;
  };
  const store = createStore(fakeReducer);

  // create callback function which renders a new wrapper to subscribe to store.
  const renderWrapper = (store = store) => {
    wrapper = shallow(
      <MainRecipe
        store={store}
        dispatch={() => store.dispatch(actions.toggleEdit())}
        toggleEdit={store.getState()}
      />
    );
  };
  store.subscribe(() => renderWrapper(store));

  beforeEach('render recipe', () => {
    renderWrapper(store);
  });

  it('initially renders in non-editable state', () => {
    expect(wrapper).to.not.be.undefined;
    expect(wrapper.find('.recipe-content').prop('contentEditable')).to.equal(false);
  });

  it('has an action called toggleEdit', () => {
    expect(actions.toggleEdit).to.not.be.undefined;
    expect(actions.toggleEdit().type).to.equal('TOGGLE_EDIT');
  });

  it('toggles "contentEditable" field on button click', () => {
    expect(wrapper.find('button')).to.not.be.undefined;
    wrapper.find('button').simulate('click');
    expect(store.getState()).to.equal(true);
    expect(wrapper.find('.recipe-content').prop('contentEditable')).to.equal(true);
    wrapper.find('button').simulate('click');
    expect(wrapper.find('.recipe-content').prop('contentEditable')).to.equal(false);
  });

  it('displays the recipe title', () => {
    // expect(wrapper.find('')).to.equal(fakeRecipe.title);
  });

  it('displays the recipe procedures', () => {
    // expect().to.equal();
  });

  it('displays the recipe followers', () => {
    // expect().to.equal();
  });

});
