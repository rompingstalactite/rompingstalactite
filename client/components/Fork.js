import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import actions from '../actions/index.js';
import { forkRecipe } from '../utils/utils';

const Fork = (props) => {
  let forkComponent;
  if (props.userID) {
    forkComponent = (<button style={{marginRight: '10px'}} className="btn btn-primary btn-sm btn-fork" onClick={ props.onForkClick.bind(null, props.recipeID, props.userID) }>
      Fork
    </button>);
  } else {
    forkComponent = (<button style={{marginRight: '10px'}} className="btn btn-primary btn-sm btn-fork" disabled>Fork</button>);
  }
  return forkComponent;
};

const mapStateToProps = (state) => {
  return {
    userID: state.user.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onForkClick: (recipeID, userID) => {
      forkRecipe(recipeID, userID, (newRecipe) => {
        dispatch(actions.forkRecipe(newRecipe));
        dispatch(push(`/recipe/${newRecipe.id}`));
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Fork);
