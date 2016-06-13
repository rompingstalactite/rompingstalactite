import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../scss/_profile.scss';
import RecipeContainer from './RecipeContainer.js';
import { fetchUser, fetchRecipesLiked, fetchRecipesCreated } from '../utils/utils';
import actions from '../actions/index.js';

class Profile extends Component {

  componentDidMount() {
    const { updateProfile, id } = this.props;
    updateProfile(+id);
  }

  componentWillUpdate(nextProps) {
    const currId = this.props.id;
    const { updateProfile, id } = nextProps;
    if (+currId !== +id) {
      updateProfile(+id);
    }
  }

  render() {
    const { user, recipesCreated, recipesFollowed, recipesLiked } = this.props;
    // const avatarLarge = avatar.slice(0, user.avatar.length - 6); // slice off ?sz=50 from Google's avatar url
    return (
      <div className="container">
        <div className="profile-avatar-username row">
          <div className="col-xs-12 col-md-3">
            <h1 className="profile-username">{user.display_name}</h1>
            <img className="profile-avatar" src={user.avatar} alt="avatar"></img>
          </div>
          <div className="profile-recipe-containers col-xs-12 col-md-9">
            <h3>Created Recipes</h3>
            <RecipeContainer
              className="recipes-created"
              type="My Recipes"
              recipes={recipesCreated}
            />
            {/*<RecipeContainer
              className="recipes-followed"
              type="Followed Recipes"
              recipes={recipesFollowed}
            />*/}
            <h3>Liked Recipes</h3>
            <RecipeContainer
              className="recipes-liked"
              type="Liked Recipes"
              recipes={recipesLiked}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.profile.user,
    recipesCreated: state.profile.recipesCreated,
    recipesFollowed: state.profile.recipesFollowed,
    recipesLiked: state.profile.recipesLiked,
    id: ownProps.params.user_id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (userID) => {
      fetchUser(userID, (user) => {
        dispatch(actions.setProfileUser(user));
      });
      fetchRecipesCreated(userID, (recipesCreated) => {
        dispatch(actions.setProfileRecipesCreated(recipesCreated));
      });
      // fetchRecipesFollowed(userID, (recipesFollowed) => {
      //   dispatch(actions.setProfileRecipesFollowed(recipesFollowed));
      // });
      fetchRecipesLiked(userID, (recipesLiked) => {
        dispatch(actions.setProfileRecipesLiked(recipesLiked));
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
