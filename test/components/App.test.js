const expect = require('chai').expect;
const React = require('react');
const TestUtils = require('react-addons-test-utils'); // Alternately could use the DOM API

import App from '../../client/components/App.js';

describe('app', () => {
  // before('render app', function() {
  //   var renderedComponent = TestUtils.renderIntoDocument(
  //     <App />
  //   );
  //
  //   // Searching for <input> tag within rendered React component
  //   // Throws an exception if not found
  //   // var inputComponent = TestUtils.findRenderedDOMComponentWithTag(
  //   //   renderedComponent,
  //   //   'input'
  //   // );
  //
  //   // this.inputElement = inputComponent.getDOMNode();
  // });

  it('renders without problems', () => {
    const app = TestUtils.renderIntoDocument(<App />);
    expect(app).to.not.be.undefined;
  });
});
