import { useState } from "react";
import { editContact } from "./contactsAPI";
import "./conversation.css";

function Task({msg, deactivate, contact, toggleAddTask2}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState();
  const submit = () => {
    contact.tasks.push({
      title,
      description,
      date,
    });
    if (editContact(contact)) {
      msg(true);
    } else {
      msg(false);
    };
  }
  return (
    <div className="containerdiv">
      <div className="editmodal">
          <div onClick={toggleAddTask2} className="editoverlay"></div>
        <div className="modalcontentedit1">
      <div className="contacts-form">
        <div className="formtitle">
          <h4>Add a new task</h4>
          <div className="closeee">
              <img alt="" src="../../close.svg" onClick={toggleAddTask2}></img>
            </div>
          <hr/>
        </div>

        <div className="details">
          <h2>Task title:</h2>
          <input value = {title} type = "title" onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="details">
          <h2>Task description:</h2>
          <input value = {description} type = "description" onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className="details">
          <h2>Due date:</h2>
          <input value = {date} type = "date" onChange={(e) => setDate(e.target.value)} placeholder="dd/mm/yyyy" />
        </div>

    
        <div className="detailss">
          <button className="eventbtn" onClick={toggleAddTask2}>
            <h1>Cancel</h1>
          </button>
          <button className="eventbtn" onClick={() => {
            submit();
          }}
          >
            <h1>Add task</h1>
          </button>
        </div>
      </div>

    </div>
    </div>
    </div>
  );
}

export default Task;
