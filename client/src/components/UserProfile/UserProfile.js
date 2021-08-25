import {React, useState} from "react";
import "./UserProfile.css";

function UserProfile() {
  const [editProfile, setEditProfile] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const showEditProfile = () => setEditProfile(!editProfile);
  const showChangePassword = () => setChangePassword(!changePassword);

  return (
    <div className="user-profile">
      <div className="background">
        <img alt="User" src="../../user.svg" className="user-image"></img>
        <h1 className="user-full-name">User Full Name</h1>
      </div>

      <div className="grid-container">
        <h1 className="user-data-spec">First Name:</h1>
        <h1 className="user-data">(first name)</h1>
        <h1 className="user-data-spec">Last Name:</h1>
        <h1 className="user-data">(last name)</h1>
        <h1 className="user-data-spec">Email Address:</h1>
        <h1 className="user-data">(email address)</h1>
      </div>

      <div className="button-container">
        <button className="button" onClick={showEditProfile}>
          <img alt="Edit" src="../../edit.svg" className="icon"></img>Edit Profile
        </button>
      </div>

      <div className="button-container">
        <button className="button1" onClick={showChangePassword}>
          <img alt="Edit" src="../../edit.svg" className="icon"></img>Change Password
        </button>
      </div>

      {editProfile && (
        <div>

        </div>
      )}

      {changePassword && (
        <div>
          
        </div>
      )}
      
    </div>
  );
}

export default UserProfile;
