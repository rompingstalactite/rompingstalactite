const expect = require('chai').expect;
const React = require('react');
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import fakeStore from './fakeStore';

describe ('Fake Store', () => {
  const initialStateProfile = {
    avatar: 'http://www.carderator.com/assets/avatar_placeholder_small.png',
    username: 'USERNAME',
  };
  it('should have object as State', () => {
    expect(fakeStore.getState()).to.have.property('avatar');
  });
});