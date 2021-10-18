import { useState } from "react";
import { editContact } from "./contactsAPI";
import "./lifeevent.css";

function LifeEvent({deactivate, contact, toggleAddLife}) {
  const [category, setCategory] = useState("");
  const [date, setDate] = useState();
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <div className="containerdivv">
      <div className="editmodal1">
          <div onClick={toggleAddLife} className="editoverlay"></div>
        <div className="modalcontentedit1">
      <div className="contacts-form">
        <div className="formtitle">
          <h1>Add a life event</h1>
          <div className="closeee">
              <img alt="" src="../../close.svg" onClick={deactivate}></img>
            </div>
          <hr></hr>
        </div>

        <div className="details">
          <h2>Select event category:</h2>
          <div className="custom-select">
            <form method="post">
                <select onChange={(e) => setCategory(e.target[e.target.value].innerText)}>
                  <option value="0" disabled selected>-- Select option --</option>
                  <option value="1">Started a new job</option>
                  <option value="2">Retirement</option>
                  <option value="3">Starting school</option>
                  <option value="4">Studied abroad</option>
                  <option value="5">Started volunteering</option>
                  <option value="6">Received achievements</option>
                  <option value="7">Started military service</option>
                  <option value="8">Marriage</option>
                  <option value="9">Other</option>
                </select>
            </form>
          </div>
        </div>

        <div className="details">
          <h2>Date of event:</h2>
          <input value={date} 
                 name="date"
                 type="date" //change to time later
                 onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="details">
          <h2>Title:</h2>
          <input onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="details">
          <h2>Story:</h2>
          <input onChange={(e) => setStory(e.target.value)} />
        </div>

        <div className="details">
          <h2>Personal Notes:</h2>
          <input onChange={(e) => setNotes(e.target.value)} />
        </div>

        <div className="detailss">
          <button className="eventbtn" onClick={deactivate}>
            <h1>Cancel</h1>
          </button>
          <button className="eventbtn" onClick={() => {
            contact.lifeevents.push({
              category,
              date,
              title,
              story,
              notes,
            });
            editContact(contact);
          }}
          >
            <h1>Add life event</h1>
          </button>
        </div>
      </div>

    </div>
    </div>
    </div>
  );
}

export default LifeEvent;
