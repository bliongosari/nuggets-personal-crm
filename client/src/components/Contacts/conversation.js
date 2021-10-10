import { useState } from "react";
import "./conversation.css";

function Conversation() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="containerdiv">

      <div className="contacts-form">
        <div className="formtitle">
          <h1>Log a new conversation</h1>
          <hr></hr>
        </div>

        <div className="details">
          <h2>Date of conversation:</h2>
          <input placeholder="dd/mm/yyyy"></input>
        </div>

        <div className="details">
          <h2>Select form of communication:</h2>
          <div className="custom-select">
            <form method="post">
              <select>
                <option value="0">Phone Number</option>
                <option value="1">Email</option>
                <option value="2">Tweeter</option>
                <option value="3">Facebook</option>
                <option value="4">Instagram</option>
                <option value="5">LinkedIn</option>
              </select>
            </form>
          </div>
            
        </div>

        <div className="details">
          <h2>Topic of conversation:</h2>
          <input></input>
        </div>

        <div className="details">
          <h2>Important messages to note:</h2>
          <input></input>
        </div>

        <div className="details">
          <h2>Who started the communication:</h2>
          <input></input>
        </div>

        <div className="detailss">
          <button className="eventbtn">
            <h1>Cancel</h1>
          </button>
          <button className="eventbtn">
            <h1>Log conversation</h1>
          </button>
        </div>
      </div>

    </div>
  );
}

export default Conversation;