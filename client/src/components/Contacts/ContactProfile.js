import React from "react";
import "./ContactProfile.css";

function ContactProfile() {
  return (
    <div className="home">

        <div className="searchbar">
            <img alt="search" src="../../searchbar.svg"></img>
            <input type="text" placeholder="SEARCH CONTACTS"></input>
        </div>

        <div className="profpic">
            <img alt="plus" src="../../person-blue.svg"></img>
        </div>

         <div className="profpic">
            <h1>ALVIN LAU</h1>
        </div>

        <div className="editcontact">
            <button className="editbtn">
                <h1>EDIT CONTACT</h1>
            </button>
        </div>

        <div className="current-contacts">
            <div className="current-contacts-container">
                <h2>Full Name:</h2>
                <h3>Alvin</h3>
            </div>
            <div className="current-contacts-container">
                <h2>Preferred Name:</h2>
                <h3>Alvin</h3>
            </div>
            <div className="current-contacts-container">
                <h2>Birthday:</h2>
                <h3>9/9/99</h3>
            </div>
            <div className="current-contacts-container">
                <h2>Relationship:</h2>
                <h3>Alvin</h3>
            </div>
            <div className="current-contacts-container">
                <h2>Tags</h2>
                <h3>Alvin</h3>
            </div>
            <div className="current-contacts-container">
                <h2>How we met:</h2>
                <h3>Alvin</h3>
            </div>
            <div className="current-contacts-container">
                <h2>Description:</h2>
                <h3>Alvin</h3>
            </div>
        </div>

        <div className="current-contactss">
            <div className="current-contacts-container">
                <h2>Email Address:</h2>
                <h3>Alvin</h3>
            </div>
            <div className="current-contacts-container">
                <h2>Phone Number:</h2>
                <h3>Alvin</h3>
            </div>
            <div className="current-contacts-container">
                <h2>LinkedIn:</h2>
                <h3>9/9/99</h3>
            </div>
            <div className="current-contacts-container">
                <h2>Tweeter:</h2>
                <h3>Alvin</h3>
            </div>
        </div>

    </div>
  )
};

export default ContactProfile;
