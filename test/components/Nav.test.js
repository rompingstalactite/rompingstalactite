const expect = require('chai').expect;
const React = require('react');
import { mount } from 'enzyme';

import Nav from '../../client/components/Nav.js';

describe('<Nav />', () => {
  it('renders without problems', () => {
    const wrapper = mount(<Nav />);
    expect(wrapper.find(Nav)).to.have.length(1);
  });
});
