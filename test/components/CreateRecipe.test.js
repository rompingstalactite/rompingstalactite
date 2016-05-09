import { expect } from 'chai';
import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import fakeStore from './fakeStore';

import CreateRecipe from '../../client/components/CreateRecipe.js';

describe('<CreateRecipe />', () => {
  let wrapper;

  before('render CreateRecipe', () => {
    wrapper = mount(
      <Provider store={fakeStore}>
        <CreateRecipe />
      </Provider>);
  });

  it('renders without problems', () => {
    expect(wrapper.find(CreateRecipe)).to.have.length(1);
  });

  it('can dispatch changes to React state', () => {
    const titleField = wrapper.find('[name="title"]');
    const event1 = { target: { value: 'cat', name: 'title' } };
    titleField.simulate('change', event1);
    expect(titleField.prop('value')).to.equal('cat');

    const yieldField = wrapper.find('[name="yield"]');
    const event2 = { target: { value: 15, name: 'yield' } };
    yieldField.simulate('change', event2);
    expect(yieldField.prop('value')).to.equal(15);
  });
});