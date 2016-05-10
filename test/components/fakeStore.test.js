const expect = require('chai').expect;
const React = require('react');
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import fakeStore from './fakeStore';

describe ('::Fake Store::', () => {
  it('should have object as State', () => {
    let state = fakeStore.getState();
    expect(state).to.have.property('recipesOwned');
    expect(state).to.have.property('recipesFollowed');
    expect(state).to.have.property('recipesFeatured');
    expect(state).to.have.property('recipesTop');
  });
});
