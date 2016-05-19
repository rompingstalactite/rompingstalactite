import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/index.js';
import classNames from 'classnames';
import { getFollowState, updateFollow } from '../utils/utils.js';

// userID, targetID
// target = user follow
// target = recipe follow

class Follow extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { user, parent, handleGetFollowState } = this.props;
    let followType;

    if (parent.hasOwnProperty('displayName')) {
      followType = 'users';
    } else {
      followType = 'recipes';
    }

    handleGetFollowState((user.id || 0), (parent.id || 0), followType);
  }

  render() {
    const { user, toggleFollow, handleToggleFollow, dispatch, parent } = this.props;
    let followType;

    if (parent.hasOwnProperty('displayName')) {
      followType = 'users';
    } else {
      followType = 'recipes';
    }

    return (
      <button
        className="btn btn-primary btn-small btn-follow"
        disabled={!user.id}
        onClick={ handleToggleFollow.bind(null, user.id, parent.id, followType, toggleFollow.toggleFollow) }
      >
        Follows: {toggleFollow.followCount}
      </button>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    toggleFollow: state.toggleFollow,
    user: state.user,
    parent: ownProps.parent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetFollowState: (userIDparam, targetID, followType) => {
      const userID = userIDparam || -1;
      // const targetID = 1 || targetIDparam;
      getFollowState(userID, targetID, followType)
        .then(response => {
          dispatch(actions.toggleFollow({
            followCount: response[0].followcount,
            toggleFollow: response[0].togglefollow,
          }));
        });
    },
    handleToggleFollow: (userID, targetID, followType, toggleFollow) => {
      if (!!userID) {
        updateFollow({ userID, targetID, toggleFollow }, followType)
          .then((response) => {
              dispatch(actions.toggleFollow({
                followCount: response[0].followcount,
                toggleFollow: response[0].togglefollow,
              }));
          });
      }
    },
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(Follow);
