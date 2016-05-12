const expect = require('chai').expect;
const React = require('react');
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import fakeStore from './fakeStore';

import Nav from '../../client/components/Nav.js';


describe('<Nav />', () => {
  let wrapper;

  beforeEach('render Profile', () => {
    wrapper = mount(
      <Provider store={fakeStore}>
        <Nav />
      </Provider>);
  });

  it('renders without problems', () => {
    expect(wrapper.find(Nav)).to.have.length(1);
  });

  it('should have a search bar, a profile picture, a create link', () => {
    expect(wrapper.find('.search-bar')).to.exist;
    expect(wrapper.find({ to: '/profile' })).to.exist;
    expect(wrapper.find({ to: '/create' })).to.exist;
    expect(wrapper.find('.avatar')).to.exist;
  });
});
