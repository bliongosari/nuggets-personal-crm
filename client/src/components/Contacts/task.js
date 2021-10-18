import { useState } from "react";
import { editContact } from "./contactsAPI";
import "./conversation.css";

function Task({deactivate, contact, toggleAddTask2}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState();

  return (
    <div className="containerdiv">
      <div className="editmodal">
          <div onClick={toggleAddTask2} className="editoverlay"></div>
        <div className="modalcontentedit1">
      <div className="contacts-form">
        <div className="formtitle">
          <h4>Add a new task</h4>
          <div className="closeee">
              <img alt="" src="../../close.svg" onClick={deactivate}></img>
            </div>
          <hr/>
        </div>

        <div className="details">
          <h2>Task title:</h2>
          <input onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="details">
          <h2>Task description:</h2>
          <input onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className="details">
          <h2>Due date:</h2>
          <input onChange={(e) => setDate(e.target.value)} placeholder="dd/mm/yyyy" />
        </div>

    
        <div className="detailss">
          <button className="eventbtn" onClick={deactivate}>
            <h1>Cancel</h1>
          </button>
          <button className="eventbtn" onClick={() => {
            contact.tasks.push({
              title,
              description,
              date,
            });
            editContact(contact);
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
