import { useEffect, useState } from "react";
import { editContact } from "./contactsAPI";
import "./conversation.css";

function ViewConvo({deactivate, contact, index, toggleViewConvo}) {
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

  return (
    <div className="containerdiv">
      <div className="editmodal">
          <div onClick={toggleViewConvo} className="editoverlay"></div>
          <div className="modalcontentedit">
      <div className="contacts-form">
        <div className="formtitle">
          <h1>Conversation Information</h1>
            <div className="closeee">
              <img alt="" src="../../close.svg" onClick={toggleViewConvo}></img>
            </div>
          <hr/>
        </div>

        <div className="details">
          <h2>Date of conversation:
            {
              (new Date(date)).toDateString() == "Invalid Date"
              ? "" : (new Date(date)).toDateString()
            }
          </h2>
        </div>

        <div className="details">
          <h2>Select form of communication: {form}</h2>
        </div>

        <div className="details">
          <h2>Topic of conversation: {topic}</h2>
        </div>

        <div className="details">
          <h2>Important messages to note: {messages}</h2>
        </div>

        <div className="details">
          <h2>Who started the communication: {startedBy}</h2>
        </div>

      </div>

    </div>
    </div>
    </div>
  );
}

export default ViewConvo;
