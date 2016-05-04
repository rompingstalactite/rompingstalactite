const expect = require('chai').expect;
const React = require('react');
import { mount } from 'enzyme';

import Dashboard from '../../client/components/Dashboard.js';

describe('<Dashboard />', () => {
  it('should render without problems', () => {
    const wrapper = mount(<Dashboard />);
    expect(wrapper.find(Dashboard)).to.have.length(1);
  });
});
