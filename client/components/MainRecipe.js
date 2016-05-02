import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/index.js';

class MainRecipe extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { toggleEdit, dispatch, } = this.props;
    return (
      <div>
        <button onClick={() => dispatch(actions.toggleEdit())}> Toggle Edit </button>
        {'THIS IS THE TOGGLE EDIT STATUS!!!!'}
        {console.log(toggleEdit)}
        <div className="recipeContent" contentEditable={toggleEdit}>
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

const mapStateToProps = (state) => {
  return { toggleEdit: state.toggleEdit };
};

// const mapDispatchToProps = (dispatch) => {
//   return toggleEdit() {
//     dispatch({type: 'TOGGLE_EDIT'});
//   }
//   return { toggleEdit: state.toggleEdit };
// };

export default connect(mapStateToProps)(MainRecipe);

// swap out the div on line 9 once state is added to redux store
// <div contentEditable={props.editable}>