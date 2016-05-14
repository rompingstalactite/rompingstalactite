import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import actions from '../actions/index.js';
import { forkRecipe } from '../utils/utils';

const Fork = (props) => {
  let forkComponent;
  if (props.userID) {
    forkComponent = (<button className="btn-fork" onClick={ props.onForkClick.bind(null, props.recipeID, props.userID) }>
      Fork
    </button>);
  } else {
    forkComponent = (<button className="btn-fork" disabled>Fork</button>);
  }
  return forkComponent;
};

const mapStateToProps = (state) => {
  return {};
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
