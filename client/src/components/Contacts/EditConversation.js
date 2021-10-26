import { useEffect, useState } from "react";
import { editContact } from "./contactsAPI";
import "./conversation.css";

function EditConversation({edit, deactivate, contact, index, toggleConvo}) {
  const [date, setDate] = useState();
  const [form, setForm] = useState("");
  const [topic, setTopic] = useState("");
  const [messages, setMessages] = useState("");
  const [startedBy, setStartedBy] = useState("");

  useEffect(() => {
    setDate(contact.conversations[index].date);
    setForm(contact.conversations[index].form);
    setTopic(contact.conversations[index].topic);
    setMessages(contact.conversations[index].messages);
    setStartedBy(contact.conversations[index].startedBy);
  }, [index]);
  
  const editDetails = () => {
    contact.conversations[index] = {
      date,
      form,
      topic,
      messages,
      startedBy,
    };
    if (editContact(contact)){
      edit(true);
    }
    else {
      edit(false);
    }
  }

  return (
    <div className="containerdiv">
      <div className="editmodal">
          <div onClick={toggleConvo} className="editoverlay"></div>
          <div className="modalcontentedit1">
      <div className="contacts-form">
        <div className="formtitle">
          <h1>Edit conversation</h1>
          <div className="closeee">
              <img alt="" src="../../close.svg" onClick={toggleConvo}></img>
            </div>
          <hr/>
        </div>

        <div className="details">
          <h2>Date of conversation:</h2>
          <input value={date} onChange={(e) => setDate(e.target.value)} placeholder="dd/mm/yyyy" />
        </div>

        <div className="details">
          <h2>Select form of communication:</h2>
          {/* <div className="custom-select">
            <form method="post"> */}
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
            {/* </form>
          </div> */}
            
        </div>

        <div className="details">
          <h2>Topic of conversation:</h2>
          <input value={topic} onChange={(e) => setTopic(e.target.value)} />
        </div>

        <div className="details">
          <h2>Important messages to note:</h2>
          <input value={messages} onChange={(e) => setMessages(e.target.value)} />
        </div>

        <div className="details">
          <h2>Who started the communication:</h2>
          <input value={startedBy} onChange={(e) => setStartedBy(e.target.value)} />
        </div>

        <div className="detailss">
          <button className="eventbtn" onClick={toggleConvo}>
            <h1>Cancel</h1>
          </button>
          <button className="eventbtn" onClick={() => {
            editDetails();
          }}
          >
            <h1>Edit conversation</h1>
          </button>
        </div>
      </div>

    </div>
    </div>
    </div>
  );
}

export default EditConversation;
