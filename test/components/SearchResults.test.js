const expect = require('chai').expect;
const React = require('react');
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import fakeStore from './fakeStore';
import SearchResults from '../../client/components/SearchResults.js';


describe('<Search />', () => {
  let wrapper;

  beforeEach('render Profile', () => {
    wrapper = mount(
      <Provider store={fakeStore}>
        <SearchResults />
      </Provider>);
  });

  it('renders without problems', () => {
    expect(wrapper.find(SearchResults)).to.have.length(1);
  });

  it('should display searched recipes from state', () => {
    expect(wrapper.find('.recipe-title')).to.have.length(3);
  });
});
