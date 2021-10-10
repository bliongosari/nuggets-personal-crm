import { useState } from "react";
import { editContact } from "./contactsAPI";
import "./conversation.css";

function Reminder({contact}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState();
  const [repeat, setRepeat] = useState();

  return (
    <div className="containerdiv">

    <div className="contacts-form">
        <div className="formtitle">
          <h1>Add a new reminder</h1>
          <hr/>
        </div>

        <div className="details">
          <h2>Reminder title:</h2>
          <input onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="details">
          <h2>Reminder description:</h2>
          <input onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className="details">
          <h2>Reminder date:</h2>
          <input placeholder="dd/mm/yyyy" onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="details">
          <h2>Repeat reminder:</h2>
          <div className="custom-select">
            <form method="post">
              <select onChange={(e) => setRepeat(e.target[e.target.value].innerText)}>
                <option value="0"/>
                <option value="1">Remind me once</option>
                <option value="2">Remind me every day</option>
                <option value="3">Remind me every week</option>
                <option value="4">Remind me every month</option>
              </select>
            </form>
          </div>
            
        </div>

        <div className="detailss">
          <button className="eventbtn">
            <h1>Cancel</h1>
          </button>
          <button className="eventbtn" onClick={() => {
            contact.reminders.push({
              title,
              description,
              date,
              repeat,
            });
            editContact(contact);
          }}
          >
            <h1>Add reminder</h1>
          </button>
        </div>
      </div>

    </div>
  );
}

export default Reminder;
