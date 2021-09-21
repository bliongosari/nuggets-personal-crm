import React, {useState} from "react";
import { useMutation, useQueryClient } from "react-query";
import "./AddContact.css";
import { addContact } from "./contactsAPI";
import api from "../../config/axiosConfig";

function AddContact() {

  const addContact = async (contact) => {
    console.log(contact);
    api({
      method: "POST",
      url: "/api/contacts/add",
      data: contact,
    })
      .then(function (res) {
        if (res.status === 200) {
          console.log("SUCCESS!");
        } else {
          console.log("FAIL");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [full_name, setFullName] = useState("");
  const [preferred_name, setPrefName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [relationship, setRelationship] = useState("");
  const [meeting_notes, setHowWeMet] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [linkedin, setLinkedIn] = useState("");
  const [twitter, setTwitter] = useState("");

  const [tags, setTags] = useState(false);

  const toggleTags = () => {
    setTags(!tags);
  };

  if(tags) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <div className="home">

      <div className="pagetitle">
        <h1>Add a new contact</h1>
      </div>
      

      {/* Form */}
      <div className="contacts-details-form">
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
          <input type="text" onChange={(e) => setFullName(e.target.value)} />
        </div>

        <div className="details">
          <h2>Preferred Name:</h2>
          <input type="text" onChange={(e) => setPrefName(e.target.value)} />
        </div>

        <div className="detail2">
          <h2>Birthday:</h2>
          <div className="detailssinput">
          <input type="text" onChange={(e) => setBirthday(e.target.value)} />
            <button className="formatbtn">
              <img alt="plus" src="../../calendarr.svg"></img>
            </button>
          </div>
          
        </div>

        <div className="details">
          <h2>Relationship</h2>
          <input type="text" onChange={(e) => setRelationship(e.target.value)} />
        </div>

        <div className="detail2">
          <h2>Tags:</h2>
          <div className="tagsinput">
            <input></input>
            <button onClick={toggleTags} className="tagsbtn">
              <h2>add tags</h2>
            </button>

            {tags && (
              <div className="modal">
                <div onClick={toggleTags} className="overlay"></div>

                <div className="modal-content">
                  <div className="color-title">
                    <h2>Color</h2>
                    <hr></hr>
                  </div>

                  <div className="closebutton">
                    <img alt="" src="../../close.svg" onClick={toggleTags}></img>
                  </div>

                  <div className="color-options">
                    <input type="checkbox"></input>
                    <label class="container">None</label>
                  </div>

                  <div className="color-options">
                    <input type="checkbox"></input>
                    <label class="container">Red</label>
                  </div>

                  <div className="color-options">
                    <input type="checkbox"></input>
                    <label class="container">Green</label>
                  </div>

                  <div className="color-options">
                    <input type="checkbox"></input>
                    <label class="container">Blue</label>
                  </div>

                  <div className="color-options">
                    <input type="checkbox"></input>
                    <label class="container">Yellow</label>
                  </div>

                  <div className="color-options">
                    <input type="checkbox"></input>
                    <label class="container">Pink</label>
                  </div>

                  <div className="color-options">
                    <input type="checkbox"></input>
                    <label class="container">Purple</label>
                  </div>

                  <div className="color-options">
                    <input type="checkbox"></input>
                    <label class="container">Orange</label>
                  </div>

                  <div className="color-options">
                    <input type="checkbox"></input>
                    <label class="container">Cyan</label>
                  </div>

                  <div className="color-options">
                    <input type="checkbox"></input>
                    <label class="container">Navy Blue</label>
                  </div>

                  <div className="addcontacts">
                    <button className="addbtn">
                      <img alt="plus" src="../../whiteadd.svg"></img>
                      <h1>Add Tags </h1>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
        </div>

        <div className="details">
          <h2>How we met:</h2>
          <input type="text" onChange={(e) => setHowWeMet(e.target.value)} />
        </div>

        <div className="details">
          <h2>Description:</h2>
          <input type="text" onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className="formtitle">
          <h1>Communication</h1>
          <hr></hr>
        </div>

        <div className="details">
          <h2>Email Address:</h2>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="details">
          <h2>Phone Number:</h2>
          <input type="text" onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>

        <div className="details">
          <h2>LinkedIn:</h2>
          <input type="text" onChange={(e) => setLinkedIn(e.target.value)} />
        </div>

        <div className="details">
          <h2>Tweeter:</h2>
          <input type="text" onChange={(e) => setTwitter(e.target.value)} />
        </div>

        <div className="addcontacts">
          <button className="addbtn" onClick={(e) => {
            addContact({
              full_name: "Sommething for now",
              preferred_name,
              birthday,
              relationship,
              // tags,
              meeting_notes,
              description,
              email,
              phone_number,
              linkedin,
              twitter,
            });
          }}
          >
            <h1>Add Contact</h1>
          </button>
        </div>

        <div className="addcontacts">
          <button className="addbtn">
            <h1>Cancel</h1>
          </button>
        </div>
      </div>

    </div>
  );
}

export default AddContact;
