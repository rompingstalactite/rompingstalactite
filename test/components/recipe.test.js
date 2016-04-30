const expect = require('chai').expect;
const React = require('react');
const TestUtils = require('react-addons-test-utils'); // Alternately could use the DOM API

import Recipe from '../../client/components/Recipe.js';

describe('recipe', () => {

  before('render recipe', function() {
    var renderedComponent = TestUtils.renderIntoDocument(
      <Recipe />
    );
  
    // Searching for <input> tag within rendered React component
    // Throws an exception if not found
    var inputComponent = TestUtils.findRenderedDOMComponentWithTag(
      renderedComponent,
      'div'
    );
   
    console.log('**************', typeof(inputComponent));
    
    console.log(inputComponent.attributes);
    // this.inputElement = inputComponent.getDOMNode();
    
    // console.log('@@@@@@@@@@@@@@', this.inputElement);
  });

  it('initially renders in non-editable state', () => {
    const recipe = TestUtils.renderIntoDocument(<Recipe />);
    expect(recipe).to.not.be.undefined;
    expect(recipe).to.not.be.undefined;
  });
});


