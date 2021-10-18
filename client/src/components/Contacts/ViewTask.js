import { useEffect, useState } from "react";
import { editContact } from "./contactsAPI";
import "./conversation.css";

function ViewTask({deactivate, contact, index, toggleViewTask2}) {
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
      <div className="editmodal">
        <div onClick={toggleViewTask2} className="editoverlay"></div>
        <div className="modalcontentedit1">
      <div className="contacts-form">
        <div className="formtitle">
          <h4>Task Information</h4>
            <div className="closeee">
              <img alt="" src="../../close.svg" onClick={toggleViewTask2}></img>
            </div>
          <hr/>
        </div>

        <div className="details">
          <h2>Task title: {title}</h2>
        </div>

        <div className="details">
          <h2>Task description: {description}</h2>
        </div>

        <div className="details">
          <h2>Due date:
            {
              (new Date(date)).toDateString() == "Invalid Date"
              ? "" : (new Date(date)).toDateString()
            }
          </h2>
        </div>


      </div>

    </div>
    </div>
    </div>
  );
}

export default ViewTask;
