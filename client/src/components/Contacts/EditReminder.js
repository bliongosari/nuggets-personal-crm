import { useEffect, useState } from "react";
import { editContact } from "./contactsAPI";
import "./conversation.css";

function EditReminder({edit, deactivate, contact, index, toggleRemind}) {
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

  const editDetails = () => {
    contact.reminders[index] = {
      title,
      description,
      date,
      repeat,
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
          <div onClick={toggleRemind} className="editoverlay"></div>
        <div className="modalcontentedit1">
          <div className="contacts-form">
              <div className="formtitle">
                <h1>Edit reminder</h1>
                <div className="closeee">
              <img alt="" src="../../close.svg" onClick={toggleRemind}></img>
            </div>
                <hr/>
              </div>

              <div className="details">
                <h2>Reminder title:</h2>
                <input value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>

              <div className="details">
                <h2>Reminder description:</h2>
                <input value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>

              <div className="details">
                <h2>Reminder date:</h2>
                <input value={date} placeholder="dd/mm/yyyy" onChange={(e) => setDate(e.target.value)} />
              </div>

              <div className="details">
                <h2>Repeat reminder:</h2>
                <div className="custom-select">
                  <form method="post">
                    <select onChange={(e) => setRepeat(e.target[e.target.value].innerText)}>
                      <option value="0" disabled selected>-- Select option --</option>
                      <option value="1">Remind me once</option>
                      <option value="2">Remind me every day</option>
                      <option value="3">Remind me every week</option>
                      <option value="4">Remind me every month</option>
                    </select>
                  </form>
                </div>
                  
              </div>

              <div className="detailss">
                <button className="eventbtn" onClick={toggleRemind}>
                  <h1>Cancel</h1>
                </button>
                <button className="eventbtn" onClick={() => {
                  editDetails();
                }}
                >
                  <h1>Edit reminder</h1>
                </button>
              </div>
            </div>
        </div>
    </div>
    </div>
  );
}

export default EditReminder;
