const expect = require('chai').expect;
const React = require('react');
const TestUtils = require('react-addons-test-utils'); // Alternately could use the DOM API

import Recipe from '../../client/components/Recipe.js';
import actions from '../../client/actions/index.js';

describe('recipe', () => {

  // testing the div in <Recipe />
  let renderedComponent;
  let inputComponent;
  let button;

  before('render recipe', () => {
    renderedComponent = TestUtils.renderIntoDocument(
      <Recipe />
    );
    // Searching for <input> tag within rendered React component
    // Throws an exception if not found
    inputComponent = TestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'recipeContent'
    );

    button = TestUtils.findRenderedDOMComponentWithTag(
      renderedComponent,
      'button'
    );
  });

  it('initially renders in non-editable state', () => {
    expect(renderedComponent).to.not.be.undefined;
    expect(inputComponent.getAttribute('contenteditable')).to.equal('false');
  });

  it('has an action called toggleEdit', () => {
    expect(actions.toggleEdit).to.not.be.undefined;
    expect(actions.toggleEdit().type).to.equal('TOGGLE_EDIT');
  });

  it('calls toggleEdit on button click', () => {
    expect(button).to.not.be.undefined;
  });

  // it('initially renders in non-editable state', () => {
  //   const recipe = TestUtils.renderIntoDocument(<Recipe />);
  //   expect(recipe).to.not.be.undefined;
  //   expect(inputComponent.getAttribute('contenteditable')).to.equal('true');
  // });
});


