import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/index.js';
import classNames from 'classnames';
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

    const likedClass = classNames({
      'btn': true,
      'btn-like': true,
      'btn-active': toggleLike.toggleLike,
    });

    return (
      <div className="like-button" onClick={handleToggleLike.bind(null, userID, recipeID, toggleLike.toggleLike)}>
        <span className={likedClass}> {toggleLike.likeCount} </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    toggleLike: state.toggleLike,
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
