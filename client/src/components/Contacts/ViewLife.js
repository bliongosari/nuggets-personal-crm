import { useEffect, useState } from "react";
import { editContact } from "./contactsAPI";
import "./lifeevent.css";

function ViewDetails({deactivate, contact, index, toggleViewLife}) {
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    console.log(index);
    setCategory(contact.lifeevents[index].category);
    setDate(contact.lifeevents[index].date);
    setTitle(contact.lifeevents[index].title);
    setStory(contact.lifeevents[index].story);
    setNotes(contact.lifeevents[index].notes);
  }, [index]);

  return (
    <div className="containerdivv">
      <div className="editmodal">
          <div onClick={toggleViewLife} className="editoverlay"></div>
        <div className="modalcontentedit">
          <div className="contacts-form">
          <div className="formtitle">
            <h1>Life Event Information</h1>
            <div className="closeee">
              <img alt="" src="../../close.svg" onClick={toggleViewLife}></img>
            </div>
            <hr></hr>
          </div>

          <div className="details">
            <h2>Event category: {category}</h2>
          </div>

          <div className="details">
            <h2>Date of event: {date}</h2>
          </div>

          <div className="details">
            <h2>Title: {title}</h2>
          </div>

          <div className="details">
            <h2>Story: {story}</h2>
          </div>

          <div className="details">
            <h2>Personal Notes: {notes}</h2>

          </div>
        </div>
        </div>
        
      </div>
    </div>
  );
}

export default ViewDetails;
