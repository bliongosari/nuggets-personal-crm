import React from "react";
import "./UserProfile.css";

function UserProfile() {
  return (
    <div>
      <div class="background">
        <img alt="User" src="../../person.svg" class="user-image"></img>
        <h1 class="user-full-name">User Full Name</h1>
      </div>

      <div class="grid-container">
        <h1 class="user-data-spec">First Name:</h1>
        <h1 class="user-data">(first name)</h1>
        <h1 class="user-data-spec">Last Name:</h1>
        <h1 class="user-data">(last name)</h1>
        <h1 class="user-data-spec">Email Address:</h1>
        <h1 class="user-data">(email address)</h1>
      </div>

      <div class="button-container">
        <button class="button">
          <img alt="Edit" src="../../edit.svg" class="icon"></img>Edit Profile
        </button>
      </div>

      <div class="button-container">
        <button class="button">
          <img alt="Edit" src="../../edit.svg" class="icon"></img>Change Password
        </button>
      </div>
      
    </div>
  );
}

export default UserProfile;
