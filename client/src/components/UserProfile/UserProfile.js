import {React, useState} from "react";
import "./UserProfile.css";

function UserProfile() {
  const [editProfile, setEditProfile] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const showEditProfile = () => setEditProfile(!editProfile);
  const showChangePassword = () => setChangePassword(!changePassword);

  return (
    <div className="user-profile">
      {/* User profile page */}
      <div className="background">
        <img alt="User" src="../../user.svg" className="user-image"></img>
        <h1 className="user-full-name">USER FULL NAME</h1>
      </div>
      <div className="grid-container">
        <h1 className="user-data-spec">FIRST NAME:</h1>
        <h1 className="user-data">(first name)</h1>
        <h1 className="user-data-spec">LAST NAME:</h1>
        <h1 className="user-data">(last name)</h1>
        <h1 className="user-data-spec">EMAIL ADDRESS:</h1>
        <h1 className="user-data">(email address)</h1>
      </div>

      {/* Edit profile button */}
      <div className="button-container">
        <button className="button" onClick={showEditProfile}>
          <img alt="Edit" src="../../edit.svg" className="icon"></img>Edit Profile
        </button>
      </div>

      {/* Change password button */}
      <div className="button-container">
        <button className="button1" onClick={showChangePassword}>
          <img alt="Edit" src="../../edit.svg" className="icon"></img>Change Password
        </button>
      </div>

      {/* Edit profile popup */}
      {editProfile && (
        <div className="popup">
          <div className="box">
            <span className="close-icon" onClick={showEditProfile}>
              <img alt="close" src="../../close.svg"></img>
            </span>
            <img alt="User" src="../../user.svg" className="user-image"></img>
            <h1 className="popup-header">EDIT PROFILE</h1>
            <input className="popup-text" type="text" placeholder="ENTER A NEW FIRST NAME"/>
            <input className="popup-text" type="text" placeholder="ENTER A NEW LAST NAME"/>
            <input className="popup-text" type="text" placeholder="ENTER A NEW EMAIL ADDRESS"/>
            <div className="centered-button">
              <button className="button" onClick={showEditProfile}>
                <img alt="Edit" src="../../edit.svg" className="icon"></img>Change Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change password popup */}
      {changePassword && (
        <div className="popup">
        <div className="box">
          <span className="close-icon" onClick={showChangePassword}>
            <img alt="close" src="../../close.svg"></img>
          </span>
          <img alt="User" src="../../user.svg" className="user-image"></img>
          <h1 className="popup-header">CHANGE PASSWORD</h1>
          <input className="popup-text" type="text" placeholder="ENTER CURRENT PASSWORD"/>
          <input className="popup-text" type="text" placeholder="ENTER A NEW PASSWORD"/>
          <input className="popup-text" type="text" placeholder="CONFIRM NEW PASSWORD"/>
          <div className="centered-button">
            <button className="button" onClick={showChangePassword}>
              <img alt="Edit" src="../../edit.svg" className="icon"></img>Change Password
            </button>
          </div>
        </div>
      </div>
      )}
      
    </div>
  );
}

export default UserProfile;
