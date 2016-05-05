const expect = require('chai').expect;
const React = require('react');
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import fakeStore from './fakeStore';

import Dashboard from '../../client/components/Dashboard.js';

describe('<Dashboard />', () => {
  let wrapper;

  beforeEach('render Dashboard', () => {
    wrapper = mount(
      <Provider store={fakeStore}>
        <Dashboard />
      </Provider>);
  });

  it('should render without problems', () => {
    expect(wrapper.find(Dashboard)).to.have.length(1);
  });
});
