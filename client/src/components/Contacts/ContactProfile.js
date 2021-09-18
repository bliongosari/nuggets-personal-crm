import React from "react";
import "./ContactProfile.css";
import Tabs from './tabs';



function ContactProfile(props) {
  const { contact } = props.location.state;
  

  return (
    <div className="home">
        <div className="searchbar">
            <img alt="search" src="../../searchbar.svg"></img>
            <input type="text" placeholder="SEARCH CONTACTS"></input>
        </div>

        <div className="profileheader">
            <div className="profpic">
                <img alt="plus" src="../../person-blue.svg"></img>
            </div>

            <div className="profpic">
                <h1>{contact.full_name}</h1>
                <div className="lastactivity">
                    <h1>Last contacted: </h1>
                    <h1>Tags:</h1>
                </div>
            </div>
        </div>

        <div className="contactcontent">
            <div className="contactdetails">
                <div className="current-contacts">
                    <div className="current-contacts-container">
                        <h2>Full Name:</h2>
                        <h3>{contact.full_name || "-"}</h3>
                    </div>
                    <div className="current-contacts-container">
                        <h2>Preferred Name:</h2>
                        <h3>{contact.preferred_name || "-"}</h3>
                    </div>
                    <div className="current-contacts-container">
                        <h2>Birthday:</h2>
                        <h3>{contact.birthday || "-"}</h3>
                    </div>
                    <div className="current-contacts-container">
                        <h2>Relationship:</h2>
                        <h3>{contact.relationship || "-" }</h3>
                    </div>
                    <div className="current-contacts-container">
                        <h2>Tags</h2>
                        <h3>{contact.tags[0] || "-"}</h3>
                    </div>
                    <div className="current-contacts-container">
                        <h2>How we met:</h2>
                        <h3>{contact.meetDetails|| "-"}</h3>
                    </div>
                    <div className="current-contacts-container">
                        <h2>Description:</h2>
                        <h3>{contact.description || "-"}</h3>
                    </div>
                </div>

                <div className="current-contactss">
                    <div className="current-contacts-container">
                        <h2>Email Address:</h2>
                        <h3>{contact.email || "-"}</h3>
                    </div>
                    <div className="current-contacts-container">
                        <h2>Phone Number:</h2>
                        <h3>{contact.phone_number || "-"}</h3>
                    </div>
                    <div className="current-contacts-container">
                        <h2>LinkedIn:</h2>
                        <h3>{contact.linkedin || "-"}</h3>
                    </div>
                    <div className="current-contacts-container">
                        <h2>Twitter:</h2>
                        <h3>{contact.twitter || "-"}</h3>
                    </div>
                </div>

                <div className="detailsbutton">
                    <div className="editcontact">
                        <button className="editbtn">
                            <h1>Edit Contact</h1>
                        </button>
                    </div>

                    <div className="editcontact">
                        <button className="editbtn">
                            <h1>Delete Contact</h1>
                        </button>
                    </div>
                </div>
               

            </div>

            <div className="contactfunctionality">
                <Tabs/>
            </div>

        
        </div>
        

    </div>
  )
};

export default ContactProfile;
