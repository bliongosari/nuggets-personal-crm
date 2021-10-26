import { useEffect, useState } from "react";
import { editContact } from "./contactsAPI";
import "./conversation.css";

function ViewReminder({deactivate, contact, index, toggleViewReminder}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState();
  const [repeat, setRepeat] = useState();

  useEffect(() => {
    setTitle(contact.reminders[index].title);
    setDescription(contact.reminders[index].description);
    setDate(contact.reminders[index].date);
    setRepeat(contact.reminders[index].repeat);
  }, [index]);

  return (
    <div className="containerdiv">
      <div className="editmodal">
          <div onClick={toggleViewReminder} className="editoverlay"></div>
        <div className="modalcontentedit1">
          <div className="contacts-form">
              <div className="formtitle">
                <h1>Reminder Information</h1>
                <div className="closeee">
              <img alt="" src="../../close.svg" onClick={toggleViewReminder}></img>
            </div>
                <hr/>
              </div>

              <div className="details">
                <h2>Reminder title: {title}</h2>
              </div>

              <div className="details">
                <h2>Reminder description: {description}</h2>
              </div>

              <div className="details">
                <h2>Reminder date:
                  {
                    (new Date(date)).toDateString() == "Invalid Date"
                    ? "" : (new Date(date)).toDateString()
                  }
                </h2>
              </div>

              {/* <div className="details">
                <h2>Repeat reminder: {repeat}</h2>
                  
              </div> */}

            </div>
        </div>
    </div>
    </div>
  );
}

export default ViewReminder;
