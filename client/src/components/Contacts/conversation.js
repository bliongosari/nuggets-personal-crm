import { useState } from "react";
import { editContact } from "./contactsAPI";
import "./conversation.css";

function Conversation({deactivate, contact}) {
  const [date, setDate] = useState();
  const [form, setForm] = useState("");
  const [topic, setTopic] = useState("");
  const [messages, setMessages] = useState("");
  const [startedBy, setStartedBy] = useState("");

  return (
    <div className="containerdiv">

      <div className="contacts-form">
        <div className="formtitle">
          <h1>Log a new conversation</h1>
          <hr/>
        </div>

        <div className="details">
          <h2>Date of conversation:</h2>
          <input onChange={(e) => setDate(e.target.value)} placeholder="dd/mm/yyyy"></input>
        </div>

        <div className="details">
          <h2>Select form of communication:</h2>
          <div className="custom-select">
            <form method="post">
              <select onChange={(e) => setForm(e.target[e.target.value].innerText)}>
                <option value="0" disabled selected>-- Select option --</option>
                <option value="1">Phone Number</option>
                <option value="2">Email</option>
                <option value="3">Twitter</option>
                <option value="4">Facebook</option>
                <option value="5">Instagram</option>
                <option value="6">LinkedIn</option>
                <option value="7">In Person</option>
                <option value="8">Other</option>
              </select>
            </form>
          </div>
            
        </div>

        <div className="details">
          <h2>Topic of conversation:</h2>
          <input onChange={(e) => setTopic(e.target.value)}></input>
        </div>

        <div className="details">
          <h2>Important messages to note:</h2>
          <input onChange={(e) => setMessages(e.target.value)}></input>
        </div>

        <div className="details">
          <h2>Who started the communication:</h2>
          <input onChange={(e) => setForm(e.target.value)}></input>
        </div>

        <div className="detailss">
          <button className="eventbtn" onClick={deactivate}>
            <h1>Cancel</h1>
          </button>
          <button className="eventbtn" onClick={() => {
            contact.conversations.push({
              date,
              form,
              topic,
              messages,
              startedBy,
            });
            editContact(contact);
          }}
          >
            <h1>Log conversation</h1>
          </button>
        </div>
      </div>

    </div>
  );
}

export default Conversation;