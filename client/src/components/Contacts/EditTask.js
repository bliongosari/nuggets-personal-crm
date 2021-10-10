import { useEffect, useState } from "react";
import { editContact } from "./contactsAPI";
import "./conversation.css";

function EditTask({deactivate, contact, index}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState();

  useEffect(() => {
    setTitle(contact.tasks[index].title);
    setDescription(contact.tasks[index].description);
    setDate(contact.tasks[index].date);
  }, [index]);

  return (
    <div className="containerdiv">

      <div className="contacts-form">
        <div className="formtitle">
          <h1>Edit task</h1>
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
          <button className="eventbtn" onClick={deactivate}>
            <h1>Cancel</h1>
          </button>
          <button className="eventbtn" onClick={() => {
            contact.tasks[index] = {
              title,
              description,
              date,
            };
            editContact(contact);
          }}
          >
            <h1>Edit task</h1>
          </button>
        </div>
      </div>

    </div>
  );
}

export default EditTask;
