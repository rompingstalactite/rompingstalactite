const expect = require('chai').expect;
const React = require('react');
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import App from '../../client/components/App.js';
import Nav from '../../client/components/Nav.js';
import actions from '../../client/actions/index.js';
import fakeStore from './fakeStore';

describe('<App />', () => {
  it('should render itself and its subcomponents without problems', () => {
    const wrapper = mount(
      <Provider store={fakeStore}>
        <App />
      </Provider>);
    expect(wrapper.find(App)).to.have.length(1);
    expect(wrapper.find(Nav)).to.have.length(1);
  });

  it('has an action called toggleEdit', () => {
    expect(actions.setUser).to.not.be.undefined;
    expect(actions.setUser().type).to.equal('SET_USER');
  });
});
