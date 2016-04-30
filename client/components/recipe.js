import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/index.js';


class Recipe extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <button onClick={console.log(props)}> Toggle Edit </button>
        <div className="recipeContent" contentEditable="false">
          <h5>*Recipe Component*</h5>
          <h2>Recipe Title</h2>
          <ul>
            <li>1 Egg</li>
            <li>2 Cups Flour</li>
            <li>3/4 Cup Milk</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Recipe;

// swap out the div on line 9 once state is added to redux store
// <div contentEditable={props.editable}>