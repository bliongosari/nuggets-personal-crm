import { useEffect, useState } from "react";
import { editContact } from "./contactsAPI";
import "./conversation.css";

function EditTask({edit, deactivate, contact, index, toggleTask2}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState();

  const editDetails = () => {
    contact.tasks[index] = {
      title,
      description,
      date,
    };
    if (editContact(contact)){
      edit(true);
    }
    else {
      edit(false);
    }
  }
  useEffect(() => {
    setTitle(contact.tasks[index].title);
    setDescription(contact.tasks[index].description);
    setDate(contact.tasks[index].date);
  }, [index]);

  return (
    <div className="containerdiv">
      <div className="editmodal">
          <div onClick={toggleTask2} className="editoverlay"></div>
      <div className="modalcontentedit1">
      <div className="contacts-form">
        <div className="formtitle">
          <h1>Edit task</h1>
          <div className="closeee">
              <img alt="" src="../../close.svg" onClick={toggleTask2}></img>
            </div>
          <hr/>
        </div>

        <div className="details">
          <h2>Task title:</h2>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="details">
          <h2>Task description:</h2>
          <input value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className="details">
          <h2>Due date:</h2>
          <input value={date} onChange={(e) => setDate(e.target.value)} placeholder="dd/mm/yyyy" />
        </div>

    
        <div className="detailss">
          <button className="eventbtn" onClick={toggleTask2}>
            <h1>Cancel</h1>
          </button>
          <button className="eventbtn" onClick={() => {
            editDetails();
          }}
          >
            <h1>Edit task</h1>
          </button>
        </div>
      </div>
      </div>
    </div>
    </div>

  );
}

export default EditTask;
