import React from 'react';

const Profile = (props) => (
  <div className="profile">
    <img className="profile-avatar" src={props.profile.avatar} alt="avatar"></img>
    <p className="profile-username">{props.profile.username}</p>
  </div>
);

export default Profile;
