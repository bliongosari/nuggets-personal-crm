import React from "react";
import "./AddContact.css";

function AddContact() {
return (
    <div className="home">

      <div className="pagetitle">
        <h1>Add a new contact</h1>
      </div>

      {/* <div className="addcontacts">
        <button className="addbtn">
          <img alt="plus" src="../../whiteadd.svg"></img>
          <h1>ADD NEW CONTACT</h1>
        </button>
      </div> */}
      

      {/* Form */}
      <div className="contacts-form">
        <div className="formtitle">
          <h1>Personal Details</h1>
          <hr></hr>
        </div>

        <div className="profpic">
          <img alt="plus" src="../../person-blue.svg"></img>
        </div>

        <div className="attachimage">
          <button className="attachbtn">
            <h1>Attach Image</h1>
          </button>
        </div>

        <div className="details">
          <h2>Full Name:</h2>
          <input></input>
        </div>

        <div className="details">
          <h2>Preferred Name:</h2>
          <input></input>
        </div>

        <div className="detailss">
          <h2>Birthday:</h2>
          <div className="detailssinput">
            <input></input>
            <button className="formatbtn">
              <img alt="plus" src="../../calendarr.svg"></img>
            </button>
          </div>
          
        </div>

        <div className="details">
          <h2>Relationship</h2>
          <input></input>
        </div>

        <div className="detailss">
          <h2>Tags:</h2>
          <div className="detailssinput">
            <input></input>
            <button className="formatbtn">
              <img alt="plus" src="../../palette.svg"></img>
            </button>
          </div>
          
        </div>

        <div className="details">
          <h2>How we met:</h2>
          <input></input>
        </div>

        <div className="details">
          <h2>Description:</h2>
          <input></input>
        </div>

        <div className="formtitle">
          <h1>Communication</h1>
          <hr></hr>
        </div>

        <div className="details">
          <h2>Email Address:</h2>
          <input></input>
        </div>

        <div className="details">
          <h2>Phone Number:</h2>
          <input></input>
        </div>

        <div className="details">
          <h2>LinkedIn:</h2>
          <input></input>
        </div>

        <div className="details">
          <h2>Tweeter:</h2>
          <input></input>
        </div>

        <div className="addcontacts">
          <button className="addbtn">
            <img alt="plus" src="../../whiteadd.svg"></img>
            <h1>Add Contact </h1>
          </button>
        </div>

        <div className="addcontacts">
          <button className="addbtn">
            <img alt="plus" src="../../whiteadd.svg"></img>
            <h1>Cancel</h1>
          </button>
        </div>
      </div>

    </div>
  );
}

export default AddContact;
