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
                            <option value="a">Phone Number</option>
                            <option value="b">Email</option>
                            <option value="c">Tweeter</option>
                            <option value="d">Facebook</option>
                            <option value="e">Instagram</option>
                            <option value="f">LinkedIn</option>
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