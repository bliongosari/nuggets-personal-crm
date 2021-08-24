import React from "react";
import "./UserProfile.css";

function UserProfile() {
  return (
    <div className="user-profile">
      <div className="background">
        <img alt="User" src="../../person.svg" className="user-image"></img>
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
        <button className="button">
          <img alt="Edit" src="../../edit.svg" className="icon"></img>Edit Profile
        </button>
      </div>

      <div className="button-container">
        <button className="button1">
          <img alt="Edit" src="../../edit.svg" className="icon"></img>Change Password
        </button>
      </div>
      
    </div>
  );
}

export default UserProfile;
