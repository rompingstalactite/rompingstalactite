import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/index.js';
// import classNames from 'classnames';
import { getLikeState, updateLike } from '../utils/utils';


class Like extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { userID, recipeID, handleGetLikeState } = this.props;
    handleGetLikeState(userID, recipeID);
  }

  render() {
    const { userID, recipeID, toggleLike, handleToggleLike, dispatch } = this.props;

    // const likedClass = classNames({
    //   'btn': true,
    //   'btn-like': true,
    //   'btn-active': toggleLike.toggleLike,
    // });

    return (
      <button
        className="btn btn-primary btn-small btn-like"
        disabled={!userID}
        onClick={handleToggleLike.bind(null, userID, recipeID, toggleLike.toggleLike)}
      >
        Likes: {toggleLike.likeCount || '0'}
      </button>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    toggleLike: state.toggleLike,
    userID: state.user.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetLikeState: (userIDparam, recipeID) => {
      const userID = userIDparam || -1;
      getLikeState({ userID, recipeID })
        .then(response => {
          dispatch(actions.toggleLike({
            likeCount: response.likecount,
            toggleLike: response.togglelike,
          }));
        });
    },
    handleToggleLike: (userID, recipeID, toggleLike) => {
      if (!!userID) {
        updateLike({ recipeID, userID, toggleLike })
          .then((response) => {
              dispatch(actions.toggleLike({
                likeCount: response.likecount,
                toggleLike: response.togglelike,
              }));
          });
      }
    },
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(Like);
