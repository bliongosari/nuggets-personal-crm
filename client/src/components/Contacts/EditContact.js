import React, {useState} from "react";
import "./AddContact.css";

function AddContact() {
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
        <h1>Edit existing contact</h1>
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
                </div>
              </div>
            )}
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
            <img alt="plus" src="../../pencil.svg"></img>
            <h1>Save Changes</h1>
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
