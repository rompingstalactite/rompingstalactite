const expect = require('chai').expect;
const React = require('react');
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
// import sinon from 'sinon';
import { render, shallow, mount } from 'enzyme';
// const TestUtils = require('react-addons-test-utils'); // Alternately could use the DOM API

import App from '../../client/components/App.js';
import RecipeContainer from '../../client/components/RecipeContainer.js';

// Make fake initialStates
const initialStateRecipes = [
  { name: 'Followed Recipe 1' },
  { name: 'Followed Recipe 2' },
  { name: 'Followed Recipe 3' }];

const initialStateProfile = {
  avatar: 'http://www.carderator.com/assets/avatar_placeholder_small.png',
  username: 'USERNAME',
};

// Make fake reducers
const profile = (state = initialStateProfile) => state;
const recipesOwned = (state = initialStateRecipes) => state;
const recipesFollowed = (state = initialStateRecipes) => state;
const fakeRootReducer = combineReducers({ profile, recipesOwned, recipesFollowed });

const fakeStore = createStore(fakeRootReducer);

// describe('app', () => {
//   // before('render app', function() {
//   //   var renderedComponent = TestUtils.renderIntoDocument(
//   //     <App />
//   //   );
//   //
//   //   // Searching for <input> tag within rendered React component
//   //   // Throws an exception if not found
//   //   // var inputComponent = TestUtils.findRenderedDOMComponentWithTag(
//   //   //   renderedComponent,
//   //   //   'input'
//   //   // );
//   //
//   //   // this.inputElement = inputComponent.getDOMNode();
//   // });
//
//   it('renders without problems', () => {
//     const app = TestUtils.renderIntoDocument(
//       <Provider store={fakeStore}>
//         <App />
//       </Provider>
//     );
//     expect(app).to.not.be.undefined;
//   });
// });

describe('<App />', () => {

  // it('calls componentDidMount', () => {
  //   chai.spy(App.prototype, 'componentDidMount');
  //   const wrapper = mount(<App />);
  //   expect(App.prototype.componentDidMount.calledOnce).to.be.true;
  //   App.prototype.componentDidMount.restore();
  // });

  it('should render two <RecipeContainer /> components', () => {
    const wrapper = mount(
      <Provider store={fakeStore}>
        <App />
      </Provider>);
    // expect(wrapper.find('.recipes-owned')).to.have.length(1);
    // expect(wrapper.find('.recipes-followed')).to.have.length(1);
  });
  //
  // it('renders three `.foo-bar`s', () => {
  //   const wrapper = render(<Foo />);
  //   expect(wrapper.find('.foo-bar')).to.have.length(3);
  // });
  //
  // it('rendered the title', () => {
  //   const wrapper = render(<Foo title="unique" />);
  //   expect(wrapper.text()).to.contain("unique");
  // });

});
