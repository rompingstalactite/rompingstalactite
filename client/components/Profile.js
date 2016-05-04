import React from 'react';
import { connect } from 'react-redux';

const Profile = (props) => (
  <div className="profile">
    <img className="profile-avatar" src={props.profile.avatar} alt="avatar"></img>
    <p className="profile-username">{props.profile.username}</p>
  </div>
);

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  };
};

export default connect(mapStateToProps)(Profile);
