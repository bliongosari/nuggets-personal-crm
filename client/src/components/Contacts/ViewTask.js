import { useState } from "react";
import { editContact } from "./contactsAPI";
import "./conversation.css";

function ViewTask({deactivate, contact, toggleViewTask2}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState();

  return (
    <div className="containerdiv">
      <div className="editmodal">
          <div onClick={toggleViewTask2} className="editoverlay"></div>
        <div className="modalcontentedit1">
      <div className="contacts-form">
        <div className="formtitle">
          <h4>Add a new task</h4>
          <div className="closeee">
              <img alt="" src="../../close.svg" onClick={toggleViewTask2}></img>
            </div>
          <hr/>
        </div>

        <div className="details">
          <h2>Task title:</h2>
          {/* <input onChange={(e) => setTitle(e.target.value)} /> */}
        </div>

        <div className="details">
          <h2>Task description:</h2>
          {/* <input onChange={(e) => setDescription(e.target.value)} /> */}
        </div>

        <div className="details">
          <h2>Due date:</h2>
          {/* <input onChange={(e) => setDate(e.target.value)} placeholder="dd/mm/yyyy" /> */}
        </div>


      </div>

    </div>
    </div>
    </div>
  );
}

export default ViewTask;
