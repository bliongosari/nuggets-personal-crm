import { useState, render } from "react";
import "./tabs.css";
import LifeEvent from "./lifeevent";
import EditLifeEvent from "./EditLifeEvent";
import Conversation from "./conversation";
import Reminder from "./reminder";
import EditReminder from "./EditReminder"
import Task from "./task";
import Document from "./document";
import Media from "./media";
import { editContact } from "./contactsAPI";



function Tabs({contact}) {
  const [toggleState, setToggleState] = useState(1);
  const [index, setIndex] = useState(-1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const [active, setActive] = useState(false)
  const deactivate = () => {
    setActive("");
  }

  return (
    <div className="container">
      <div className="bloc-tabs">
        <button className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={() => {toggleTab(1); setActive("");}}>
          Life events
        </button>
        <button className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={() => {toggleTab(2); setActive("");}}>
          Conversations, Reminders and Tasks
        </button>
        <button className={toggleState === 3 ? "tabs active-tabs" : "tabs"} onClick={() => {toggleTab(3); setActive("");}}>
          Photos and Documents
        </button>
      </div>

      <div className="content-tabs">
        <div className={toggleState === 1 ? "content  active-content" : "content"}>
          <div className="head">
            <h1> Life Updates of {contact.full_name}</h1>
            <button className="addbtn" onClick={() => setActive("lifeevent")}>
              <h1>Add life event</h1>
            </button>
            {/* <hr /> */}
          </div>
          
          <div className="addlifeevent">
            <div className="eventreminder-content">
              <h3>All life events regarding this person will show up here</h3>
              {contact.lifeevents.map((lifeevent, idx) => (
                <div key={contact._id}>
                  <hr/>
                  <p>{lifeevent.title}</p>
                  <button onClick={() =>  {
                    setIndex(idx);
                    setActive("editlifeevent");
                  }}>
                    EDIT
                  </button>
                  <br/>
                  <button onClick={() => {
                    contact.lifeevents.splice(idx, 1);
                    editContact(contact);
                  }}>
                    DELETE
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="contactfunctionalitydeet">
            {active === "lifeevent" && <LifeEvent deactivate={deactivate} contact={contact}/>}
            {active === "editlifeevent" && <EditLifeEvent deactivate={deactivate} contact={contact} index={index}/>}
          </div>

        </div>

        <div className={toggleState === 2 ? "content  active-content" : "content"}>
          <div className = "subcontent">
            <div className="eventreminder">
              <h1> Reminders or Notes</h1>
              <button className="eventbtn" onClick={() => setActive("reminder")}>
                <h1>Add reminder</h1>
              </button>
            </div>
            <div className="eventreminder-content">
              <h3>All reminders regarding this person will show up here</h3>
              {contact.reminders.map((reminder, idx) => (
                <div key={contact._id}>
                  <hr/>
                  <p>{reminder.title}</p>
                  <button onClick={() => {
                    setIndex(idx);
                    setActive("editreminder");
                  }}>
                    EDIT
                  </button>
                  <br/>
                  <button onClick={() => {
                    contact.reminders.splice(idx, 1);
                    editContact(contact);
                  }}>
                    DELETE
                  </button>
                </div>
              ))}
            </div>
          </div>

          <hr/>
          <div className = "subcontent">
            <div className="eventreminder">
              <h1>Task</h1>
              <button className="eventbtn" onClick={() => setActive("task")}>
                <h1>Add task</h1>
              </button>
            </div>
            <div className="eventreminder-content">
              <h3>All tasks with this person will show up here</h3>
            </div>
          </div>

          <hr/>
          <div className = "subcontent">
            <div className="eventreminder">
              <h1> Phone calls</h1>
              <button className="eventbtn" onClick={() => setActive("call")}>
                <h1>Add calls</h1>
              </button>
            </div>
            <div className="eventreminder-content">
              <h3>All phone calls with this person will show up here</h3>
            </div>
          </div>

          <div className="contactfunctionalitydeet">
            {active === "call" && <Conversation/>}
            {active === "reminder" && <Reminder deactivate={deactivate} contact={contact}/>}
            {active === "editreminder" && <EditReminder deactivate={deactivate} contact={contact} index={index}/>}
            {active === "task" && <Task/>}
          </div>
        </div>

        <div className={toggleState === 3 ? "content  active-content" : "content"}>
          <div className = "subcontent">
            <div className="eventreminder">
              <h1> &nbsp; Photos</h1>
              <button className="eventbtn" onClick={() => setActive("photo")}>
                <h1>Upload photos</h1>
              </button>
            </div>
            <div className="eventreminder-content">
              <h3>All photos regarding this person will show up here</h3>
            </div>
          </div>

          <hr/>
          <div className = "subcontent">
            <div className="eventreminder">
              <h1> &nbsp; Documents</h1>
              <button className="eventbtn" onClick={() => setActive("documents")}>
                <h1>Upload document</h1>
              </button>
            </div>
            <div className="eventreminder-content">
              <h3>All documents regarding this person will show up here</h3>
            </div>
          </div>

          <div className="contactfunctionalitydeet">
            {active === "photo" && <Media/>}
            {active === "documents" && <Document/>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tabs;